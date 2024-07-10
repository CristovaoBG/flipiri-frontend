const isDev = import.meta.env.DEV;
if (isDev){
    console.log("Running on dev mode")
}
export const URL_BASE = isDev? 'http://localhost:5000/':'https://flipiri-demo.zapto.org:443/'