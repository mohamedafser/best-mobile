import ReceiptButton from "../receipt-button";
import { ThemedText } from "../themed-text";
import { SectionBlock } from "./section-block";

type CancellationSectionProps = {
  cancellationPolicyText: string;
  reservationDetails: any;
};

const CancellationSection = (props: CancellationSectionProps) => (
  <SectionBlock title="Cancellation policy">
    <ThemedText className="text-sm leading-6 mb-5">
      {props.cancellationPolicyText}
    </ThemedText>

    <ReceiptButton
      className="self-start mb-5"
      data={props.reservationDetails}
    />
  </SectionBlock>
);

export default CancellationSection;
