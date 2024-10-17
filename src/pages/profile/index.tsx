import { getSidebarLayout } from "@/shared/ui/layout";
import { Page } from "@/shared/ui/layout/page";

function ProfilePage() {
  return <Page>Profile page</Page>;
}

ProfilePage.getLayout = getSidebarLayout;
export default ProfilePage;
