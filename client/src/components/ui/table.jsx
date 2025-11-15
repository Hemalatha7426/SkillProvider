import React from "react";

// Utility to merge class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Table = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props}>
      {children}
    </table>
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <tfoot ref={ref} className={cn("border-t bg-gray-100 font-medium [&>tr]:last:border-b-0", className)} {...props}>
    {children}
  </tfoot>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, children, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b transition-colors hover:bg-gray-50", className)} {...props}>
    {children}
  </tr>
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, children, ...props }, ref) => (
  <th ref={ref} className={cn("h-12 px-4 text-left align-middle font-medium text-gray-700", className)} {...props}>
    {children}
  </th>
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, children, ...props }, ref) => (
  <td ref={ref} className={cn("p-4 align-middle", className)} {...props}>
    {children}
  </td>
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, children, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-gray-500", className)} {...props}>
    {children}
  </caption>
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
