"use client";

import { Accessor, createSignal } from "solid-js";
import { Setter } from "solid-js";
import { SignUpModalFlow } from "../../../utils/types";


function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


export default function Email({
    // eslint-ignore
    email,
    setFlow,
    setEmail,
    // eslint-ignore
    setMethodId, 
}: {
    email: Accessor<string>;
    setFlow: Setter<SignUpModalFlow>;
    setEmail: Setter<string>;
    setMethodId: Setter<string>;
}) {
    // const stytchClient = useStytch();

    // const sendPasscode = createMemo(() => {
    //     return stytchClient.otps.email.loginOrCreate(email!, {
    //         expiration_minutes: 5,
    //     });
    // }, [stytchClient, email]);

    const [valid, setValid] = createSignal<boolean>(false);
    const handleClick = () => {
        if (valid()) {
            setFlow("otp");
            // sendPasscode().then((val) => setMethodId(val.method_id));
        }
    };
    return (
        <div class="flex flex-col h-full w-full mt-[16px]">
            <div class="">
                <h3 class="text-[31px] font-semibold tracking-tighter leading-[150%]">
                    Enter your email
                </h3>
                <p class="text-black/60 text-sm leading-[150%]">
                    We will send you a 6 digit code
                </p>
            </div>
            <div class="bg-[#EBEBEB] text-black/90 p-[12px] rounded-[12px] mt-[12px]">
                <input
                    type="text"
                    onChange={(e) => {
                        let isValid = isValidEmail(e.target.value);
                        setValid(isValid);
                        if (isValid) {
                            setEmail(e.target.value);
                        }
                    }}
                    class="w-full bg-transparent outline-none border-none"
                    placeholder="Email"
                />
            </div>
            <button
                onClick={handleClick}
                class="bg-black text-white leading-[20px] rounded-[16px] py-[16px] mt-[12px] disabled:opacity-80"
                disabled={!valid}
            >
                Continue
            </button>
        </div>
    );
}