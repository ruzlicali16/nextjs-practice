class InvoiceService {
    private url = 'http:localhost:3000/api/dashboard/invoices'

    async searchOrPaginateInvoices(query?: string, page?: string) {
        const response = await fetch(`${this.url}?query=${query}`,
            {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
        const totalPages = await response.json() as number;
    }
}

export const invoiceService = new InvoiceService();