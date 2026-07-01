import { Text } from "react-native";
import ReceiptButton from "../receipt-button";
import { SectionBlock } from "./section-block";

type CancellationSectionProps = {
  cancellationPolicyText: string;
  reservationDetails: any;
};

const CancellationSection = (props: CancellationSectionProps) => (
  <SectionBlock title="Cancellation policy">
    <Text className="text-sm leading-6 text-zinc-950 mb-5">
      {props.cancellationPolicyText}
    </Text>

    <ReceiptButton
      className="self-start mb-5"
      data={props.reservationDetails}
    />
  </SectionBlock>
);

export default CancellationSection;
