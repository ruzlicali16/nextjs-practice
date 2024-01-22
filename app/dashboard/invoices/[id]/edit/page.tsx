import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CustomerField, InvoiceForm } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Edit Invoices',
};

export default async function EditInvoicePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const id = params.id;
  const url = process.env.URL || 'http://localhost:3000/api/dashboard';
  const [invoiceRes, customerRes] = await Promise.all([
    fetch(`${url}/invoices/${id}/edit`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    fetch(`${url}/customers`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }),
  ]);
  const invoice = await invoiceRes.json() as InvoiceForm;
  const customers = await customerRes.json() as CustomerField[];;

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
