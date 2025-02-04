interface IBadgeProps {
    title: string,
    bgColor?: string,
    color?: string
}
const Badge = (props: IBadgeProps) => {

    const { title, color } = props

    let bgColor = "bg-black"

    switch(title){
        case "ACTIVE":
            bgColor = "bg-green-500"
            break;
        case "INACTIVE":
            bgColor = "bg-slate-600"
            break;
        case "DEACTIVATED":
            bgColor="bg-gray-500"
            break;
        case "SUSPENDED":
            bgColor="bg-orange-500"
            break;
        case "ASSIGNED": 
            bgColor="bg-primary"
            break;
        case "PENDING":
            bgColor="bg-yellow-500"
            break;
        case "CANCELLED":
            bgColor="bg-red-500"
            break;
        case "ACKNOWLEDGED":
            bgColor="bg-blue-500"
            break
        case "APPROVED":
            bgColor="bg-emerald-500"
            break;
        case "COMPLETED":
            bgColor="bg-primary"
            break
    }
    return(
        <div className={`p-1 w-28 ${bgColor} rounded-lg flex items-center justify-center`} >
            <p className={`${color? `text-${color}` : "text-white"} font-semibold text-center text-xs`}>{title}</p>
        </div>
    )
}

export default Badge