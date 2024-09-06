
import CustomerList from "../Components/customer/CustomerList";
import SidenavLayout from "../Layouts/SidenavLayout";

export default function DashboardPage() {
    return (
        <SidenavLayout>
            <CustomerList />
        </SidenavLayout>
    );
}