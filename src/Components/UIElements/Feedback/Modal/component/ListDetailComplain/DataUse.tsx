export function useListDetailComplain() {

  const headers = [
    {
      accessorKey: "Caller_Name",
      header: "إسم المتصل",
      sort: true,
      active: true,
    },
    {
      accessorKey: "Caller_Number",
      header: "رقم المتصل",
      sort: true,
      active: true,
    },
    {
      accessorKey: "Reference_No",
      header: "الرقم المرجعي",
      sort: true,
      active: true,
    },
    {
      accessorKey: "Directed_To",
      header: "موجهة لـ",
      sort: true,
      active: true,
    },
    {
      accessorKey: "Address",
      header: "العنوان",
      sort: true,
      active: true,
    },
    
    {
      accessorKey: "Creation_Date",
      header: "تاريخ الإنشاء",
      sort: true,
      active: true,
    },
    {
      accessorKey: "Latitude",
      header: "خط العرض",
      sort: true,
      active: false,
    },
    {
      accessorKey: "Longitude",
      header: "خط الطول",
      sort: true,
      active: false,
    },
    {
      accessorKey: "Region",
      header: "الإقليم",
      sort: true,
      active: false,
    },
    {
      accessorKey: "Governorate",
      header: "المحافظة",
      sort: true,
      active: false,
    },
  ];

  return { headers };
}
