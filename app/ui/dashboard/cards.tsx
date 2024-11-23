import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
} from '@heroicons/react/24/outline';
import {lusitana} from '@/app/ui/fonts';
import {fetchCustomerCount, fetchInvoicesCountByStatus} from "@/app/lib/data";

const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
};

export default async function CardWrapper() {
    const [invoiceCountByStatus, customerCount] = await Promise.all([fetchInvoicesCountByStatus(), fetchCustomerCount()])
    const numberOfInvoices = Array.from(invoiceCountByStatus.values()).reduce((accumulator, current) => accumulator + current, 0);


    return (
        <>
            <Card title="Collected" value={invoiceCountByStatus.get("paid") ?? 0} type="collected"/>
            <Card title="Pending" value={invoiceCountByStatus.get("pending") ?? 0} type="pending"/>
            <Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>
            <Card
                title="Total Customers"
                value={customerCount}
                type="customers"
            />
        </>
    );
}

export function Card({
                         title,
                         value,
                         type,
                     }: {
    title: string;
    value: number | string;
    type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700"/> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
