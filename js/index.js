const resizeWindow = () => {
    //API Call
    console.log("Window Resize");
}

//window.addEventListener("resize", resizeWindow); //When window is resize for once, hundreds of time this resizeWindow() will be called

//throttleMthod Implementation
const throttle = (func, limit) => {  //2 arguments resizeWindow and limit/duration after which function should be throttled
    let flag = true;                  // lets call this function func() only when flag is true.To restrict function call
    return function () {             //throttle method gives us back a function "optimizedResizeFunct".
        let context = this;          //handle the context which is this and the arguments.
        let args = arguments;
        if (flag) {
            func.apply(context, args);           //func() -> firts time func() will be called thats is resizeWindow
            flag = false;                       // we have to use apply method here
            setTimeout(() => {
                flag = true;        //will make flag as true again only when time limit is crossed
            }, limit)
        }
    }
}

//If we attach this optimizedResizeFunct on resize event which is throttled version, when we resize
//it will not get triggered again and again. limit is duration after which function should be called
const optimizedResizeFunct = throttle(resizeWindow, 5000);
window.addEventListener("resize", optimizedResizeFunct);

//Concept of closure is applied for flag case (used closure here so that we dont have to reinitialize again and again)