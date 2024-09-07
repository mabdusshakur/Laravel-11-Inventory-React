import CategoryList from "../Components/category/CategoryList";
import SidenavLayout from "../Layouts/SidenavLayout";

export default function DashboardPage() {
    return (
        <SidenavLayout>
            <CategoryList />
        </SidenavLayout>
    );
}