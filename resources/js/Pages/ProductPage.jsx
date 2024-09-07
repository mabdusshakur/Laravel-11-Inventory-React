import ProductList from "../Components/product/ProductList";
import SidenavLayout from "../Layouts/SidenavLayout";

export default function DashboardPage() {
    return (
        <SidenavLayout>
            <ProductList />
        </SidenavLayout>
    );
}