import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const formatCurrency = (amount?: number, currency = "USD") => {
  if (amount == null) return "";
  return `${currency} ${Number(amount).toFixed(2)}`;
};

const sanitizeText = (value?: string) => {
  return value?.replace(/<[^>]*>/g, "").replace(/\n/g, "<br />") ?? "";
};

export const downloadReceiptPdf = async (data: any) => {
  const currency =
    data?.order?.payment_details?.totalAmount?.currency ||
    data?.order?.room?.pricing?.free?.currency ||
    "USD";

  const nights = 1;

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #222;
            padding: 24px;
            font-size: 14px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 28px;
          }
          .title {
            font-size: 24px;
            font-weight: 600;
          }
          .muted {
            color: #666;
          }
          .grid {
            display: flex;
            gap: 12px;
          }
          .card {
            border: 1px solid #d3e0fe;
            padding: 20px;
            margin-bottom: 20px;
            flex: 1;
          }
          .section-title {
            font-size: 22px;
            margin-bottom: 16px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            color: #555;
          }
          .total {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 700;
          }
          hr {
            border: 0;
            border-top: 1px solid #d3e0fe;
            margin: 16px 0;
          }
        </style>
      </head>

      <body>
        <div class="header">
          <div>
            <div class="title">Your receipt from Best</div>
            <p class="muted">
              PNR: <strong>${data?.pnr ?? ""}</strong> · ${data?.created_at ?? ""}
            </p>
          </div>
          <div class="title">Best</div>
        </div>

        <div class="grid">
          <div class="card">
            <div class="section-title">Booking Details</div>

            <h3>
              ${nights} night in ${data?.order?.hotel?.name ?? ""}
            </h3>

            <hr />

            <p>
              ${data?.order?.booking_details?.trip_start ?? ""} -
              ${data?.order?.booking_details?.trip_end ?? ""}
            </p>

            <p class="muted">
              ${data?.order?.booking_details?.reservation_room_type ?? ""}
            </p>

            <hr />

            <h3>Cancellation policy</h3>
            <p class="muted">
              ${data?.room?.refunds?.description ?? ""}
            </p>

            ${
              data?.room?.policies?.tariff_notes
                ? `
                  <h3>Tariff Notes</h3>
                  <p class="muted">
                    ${sanitizeText(data?.room?.policies?.tariff_notes)}
                  </p>
                `
                : ""
            }
          </div>

          <div style="flex: 1;">
            <div class="card">
              <div class="section-title">Price Breakdown</div>

              <div class="row">
                <span>${nights} night</span>
                <span>${formatCurrency(
                  data?.order?.payment_details?.totalAmount?.amount,
                  currency,
                )}</span>
              </div>

              <div class="row">
                <span>Taxes</span>
                <span>${formatCurrency(data?.order?.room?.pricing?.tax, currency)}</span>
              </div>

              ${
                data?.coinRedeemed
                  ? `
                    <div class="row">
                      <span>Coin Redeemed</span>
                      <span>${data.coinRedeemed}</span>
                    </div>
                  `
                  : ""
              }

              <hr />

              <div class="total">
                <span>Total</span>
                <span>${formatCurrency(data?.order?.room?.pricing?.paid, currency)}</span>
              </div>
            </div>

            <div class="card">
              <div class="section-title">Payment Details</div>

              <div class="row">
                <span>**** ${data?.order?.payment_details?.paid_via ?? ""}</span>
                <span>${formatCurrency(data?.order?.room?.pricing?.paid, currency)}</span>
              </div>

              <p class="muted">${data?.order?.payment_details?.paid_at ?? ""}</p>

              <hr />

              <div class="total">
                <span>Total</span>
                <span>${formatCurrency(data?.order?.room?.pricing?.paid, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <p class="muted">
          <strong>Payment processed by:</strong> Best
        </p>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({
    html,
    base64: false,
  });

  await Sharing.shareAsync(uri, {
    mimeType: "application/pdf",
    dialogTitle: "Download Receipt",
    UTI: "com.adobe.pdf",
  });
};

const ReceiptButton = ({
  className = "",
  data,
}: {
  className?: string;
  data: any;
}) => (
  <TouchableOpacity
    className={`flex-row items-center rounded-full border border-zinc-900 px-4 py-2 ${className}`}
    onPress={() => downloadReceiptPdf(data)}
  >
    <MaterialCommunityIcons
      name="receipt-text-outline"
      size={18}
      color="#111"
    />
    <Text className="ml-2 text-sm font-semibold text-zinc-950">
      Get Receipt
    </Text>
  </TouchableOpacity>
);

export default ReceiptButton;
