import TabLayout from "@/components/layouts/tab-layout";
import { PUBLIC_TABS } from "@/constant/public-tabs";
import { Fragment } from "react";

export default function PublicTabsLayout() {
  return (
    <Fragment>
      <TabLayout tabs={PUBLIC_TABS} />
    </Fragment>
  );
}
