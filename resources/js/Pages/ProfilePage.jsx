import ProfileCreate from "../Components/profile/ProfileCreate";
import SidenavLayout from "../Layouts/SidenavLayout";

export default function DashboardPage() {
    return (
        <SidenavLayout>
            <ProfileCreate />
        </SidenavLayout>
    );
}