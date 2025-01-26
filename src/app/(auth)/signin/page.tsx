import SignInForm from "@/screens/sign-in/signinform"

const SignInPage = () => {
    return(
        <div className="flex bg-[url(/img/mountains.jpg) bg-fixed">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:w-full lg:w-1/2 h-screen">
            {/* <img className="w-screen h-screen" src="https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE="  /> */}
            </div>
            <div className="w-full md:w-1/2 h-screen flex flex-col items-center justify-center p-10">
            <div className="grid gap-5">
                    <p className="text-xl">Welcome to Shoppinng Branch Domain</p>
                    <p className="italic text-sm">Sign In Here to Continue</p>
                </div>
            <SignInForm />
            </div>
            
        </div>
    )
}

export default SignInPage