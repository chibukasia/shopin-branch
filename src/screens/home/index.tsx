import StatsCard from "@/components/molecules/cards/StatsCard"

const Home = () => {
    
    return(
        <div className="">
            <div className="flex">
                <StatsCard title={'Orders'} subTitle={'6756'} description="Just a card description"/>
            </div>
        </div>
    )
}

export default Home