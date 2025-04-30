import InformationCard from "./InformationCard";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-3 md:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <InformationCard 
        title="Total User"
        count={1660}
        desc="Users for the last 6 month"
      />
      <InformationCard 
        title="Total Doctor"
        count={260}
        desc="Doctors since warasin launched"
      />
      <InformationCard 
        title="Total Consulations"
        count={3760}
        desc="High engagement this month"
      />
    </div>
  )
}
