import { CustomerField } from "@/app/lib/definitions";
import { BASE_API_URL } from "@/app/lib/utils";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

const API_URL = BASE_API_URL;
const url = `${API_URL}/api/dashboard/customers`;
const getCustomers = async () => {
    const res = await fetch(`${url}/customers`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    return await res.json() as CustomerField[];
}

export default async function InvoicePage() {
    if (!BASE_API_URL) {
        return null;
    }
    const customers = await getCustomers();

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