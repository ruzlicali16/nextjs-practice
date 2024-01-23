import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { BASE_API_URL } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: 'Edit Invoices',
};

const API_URL = BASE_API_URL;
const url = `${API_URL}/api/dashboard`;
const getInvoicesById = async (id: string) => {
  const res = await fetch(`${url}/invoices/${id}/edit`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  return await res.json() as InvoiceForm;
}
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

export default async function EditInvoicePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  if (!BASE_API_URL) {
    return null;
  }
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    getInvoicesById(id),
    getCustomers(),
  ]);

  if (!invoice) notFound();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
