import { ThemedView } from "@/components/themed-view";
import Chip from "@/components/ui/chip";
import Tooltip from "@/components/ui/tooltip";
import { Colors } from "@/constants/theme";
import { useCurrency } from "@/hooks/use-currency";
import {
  formatCurrency,
  formatDate,
  formatToPercentage,
} from "@/lib/utils/format";
import { WalletTransaction } from "@/types/wallet.types";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const statusConfig: Record<string, any> = {
  active: "active",
  info: "info",
  refunded: "success",
  pending: "warning",
  rollback: "info",
  withdraw: "success",
  cancelled: "error",
  "pending approval": "warning",
};

const TOOLTIP_TEXT = "WALLET_TEXTS.TABLE.COINS_CONFIRM_TOOLTIP";

const BookingInfo = ({ trans }: { trans: WalletTransaction }) => (
  <View className="flex-row items-start gap-3">
    <View className="flex-1">
      <Text className="text-sm font-semibold text-gray-900">
        {trans?.title ?? (trans?.meta as any)?.details?.name ?? ""}
      </Text>

      {!!trans.booking_code && (
        <Text className="mt-1 text-[11px] text-gray-500">
          {trans.booking_code}
        </Text>
      )}

      <Text className="mt-0.5 text-[11px] text-gray-500">
        {(trans?.meta as any)?.details
          ? (trans.meta as any).details.transaction_category === "hotel"
            ? `${formatDate((trans.meta as any).details.start_date)} - ${formatDate((trans.meta as any).details.end_date)}`
            : formatDate((trans.meta as any).details.date_of_action)
          : ""}
      </Text>
    </View>
  </View>
);

const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <View className="flex-row items-center justify-between">
    <Text className="text-sm font-medium text-gray-900">{label}</Text>
    {children}
  </View>
);

type BookingCardProps = {
  trans: WalletTransaction;
};

export default function BookingCard({ trans }: BookingCardProps) {
  const { amountWithCurrency } = useCurrency();

  return (
    <ThemedView
      className="mb-4 rounded-xl p-4"
      lightColor={Colors.light.surfaceCard}
      darkColor={Colors.dark.surfaceCard}
    >
      <BookingInfo trans={trans} />

      <View className="mt-5 gap-4">
        <Row label="Booking Status">
          {trans?.booking_status ? (
            <Chip
              label={trans.booking_status}
              variant={statusConfig[trans.booking_status.toLowerCase()]}
            />
          ) : (
            <Text className="text-sm text-gray-500">-</Text>
          )}
        </Row>

        <Row label="Booking Amount">
          <Text className="text-sm text-gray-900">
            {!trans.amount
              ? "NA"
              : amountWithCurrency(formatToPercentage(trans.amount, 2))}
          </Text>
        </Row>

        <Row label="Action">
          <View className="flex-row items-center gap-2">
            <Chip
              label={trans.status}
              variant={statusConfig[trans.status?.toLowerCase()]}
            />

            {trans.status?.toLowerCase() === "pending" && (
              <Tooltip content={TOOLTIP_TEXT}>
                <Text style={{ fontSize: 12, color: "#6B7280" }}>
                  <Ionicons name="information-circle" size={20} />
                </Text>
              </Tooltip>
            )}
          </View>
        </Row>

        <Row label="Coins Earned">
          <Text className="text-sm font-medium text-gray-900">
            {formatCurrency(formatToPercentage(trans.coins), "", {
              hideCurrency: true,
            })}
          </Text>
        </Row>
      </View>
    </ThemedView>
  );
}
