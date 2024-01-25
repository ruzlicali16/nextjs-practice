import { CustomerField } from "@/app/lib/definitions";
import { BASE_API_URL } from "@/app/lib/utils";
import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

export const metadata: Metadata = {
    title: 'Create Invoices',
};

const API_URL = /development/i.test(process.env.NODE_ENV) ? BASE_API_URL : '';
const url = `${API_URL}/api/dashboard/invoices/create`;
const getCustomers = async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return await response.json() as CustomerField[];
}

export default async function CreateInvoicePage() {
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