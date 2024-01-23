import { Suspense } from "react";
import { lusitana } from "@/app/ui/fonts";
import { CreateInvoice } from "@/app/ui/invoices/buttons";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from 'next';
import { BASE_API_URL } from "@/app/lib/utils";
import Table from '@/app/ui/invoices/table';
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/invoices/pagination";

export const metadata: Metadata = {
  title: 'Invoices',
};

const getInvoicesTotalPages = async (query: string) => {
  const API_URL = BASE_API_URL;
  const url = `${API_URL}/api/dashboard/invoices`;
  const response = await fetch(`${url}?query=${query}`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  return await response.json() as number;
}

export default async function InvoicePage({
  searchParams,
}: Readonly<{
  searchParams?: {
    query?: string;
    page?: string;
  };
}>) {
  if (!BASE_API_URL) {
    return null;
  }
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getInvoicesTotalPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}