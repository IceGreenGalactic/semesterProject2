import * as listners from "./handlers/index.mjs"

export function router(){
    const path = location.pathname;

    switch (path) {
        case "/profile/login/":
            listners.setLoginFormListener();
            return;

            case "/profile/register":
                listners.setRegisterFormListener();
                return;
                
    }

}