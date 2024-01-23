import { fetchCustomers } from "@/app/lib/data";
import { CustomerField } from "@/app/lib/definitions";
import { BASE_API_URL } from "@/app/lib/utils";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

export default async function InvoicePage() {
    const API_URL = BASE_API_URL;
    const url = `${API_URL}/api/dashboard/customers`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const customers = await response.json() as CustomerField[];

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/dashboard/invoices/create',
                        active: true
                    }
                ]} />
            <Form customers={customers} />
        </main>
    );
}