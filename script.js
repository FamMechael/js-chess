let par    = [...document.querySelectorAll(".parent .row")]
let grandp = document.querySelector(".parent")
let i      = 0
let rota   = 0
let typePla= 0
document.querySelector(".sub").addEventListener("click", event => {
    if (document.querySelector("input").value >= 0) {
        document.querySelector(".grand-par").style.display = "block"
        document.querySelector(".form").style.display = "none"
        document.querySelector(".white").textContent = document.querySelector("input").value
        document.querySelector(".black").textContent = document.querySelector("input").value
    }
})
document.querySelectorAll("button").forEach(e => {
    if (i < 16) {e.setAttribute("team" , "white")} 
    else {e.setAttribute("team" , "black")}
    i++
})
nextPlayer()
let player =  0
document.body.addEventListener("click" ,  (ele) => {
    if (ele.target.matches(".soldier,.ele,.king,.mini,.hou,.rook")) {position(ele.target)}
})
function position(ele) {
    for (let index = 0; index < par.length; index++) {
        let  z  =  0  ;
        [...par[index].children].forEach(element => {
            if (element.children[0] == ele) {
                moveElement(element.children[0].className,index,z,element.children[0])
            } else {z++}
        });
    }
}
function emptyORnot() {
    par.forEach(ele => {
        Array.from(ele.children).forEach( e => {
            if (e.children.length == 0) {e.setAttribute("data-move" , "null")} 
            else {e.removeAttribute("data-move")}
        })
    })
}
function moveElement(name,row , col,element) {
    emptyORnot()
    if (document.querySelectorAll("[element]")) {
        document.querySelectorAll("[element]").forEach( e => e.removeAttribute("element"))
    }
    if (name == "soldier") {soldier(row,col,element)} 
    else if (name == "ele") {ele("ele",row,col,element)} 
    else if (name == "hou") {knight(row,col,element)} 
    else if (name == "rook") {rook("rook",row,col,element)} 
    else if (name == "mini") {ele("mini",row,col,element)} 
    else{king(row,col,element)} 
}
function reColor() {
    document.querySelectorAll(".w").forEach( ele => ele.style.backgroundColor = "bisque")
    document.querySelectorAll(".d").forEach( ele => ele.style.backgroundColor = "goldenrod")
    document.querySelectorAll(".red").forEach(elem => elem.classList.remove("red"))
}
function soldier(row , col , element) {
    reColor()
    if (!(element.id == "first-time") && element.getAttribute("team") == "black" ) {
        if (par[row - 2].children[col].getAttribute("data-move") == "null" && par[row - 1].children[col].getAttribute("data-move") == "null") {
            whiteEatblack((row-2),col,element)
        }
        if (par[row - 1].children[col].getAttribute("data-move") == "null") {
            whiteEatblack((row-1),col,element)
        }
    }
    if (!(element.id == "first-time") && element.getAttribute("team") !== "black") {
        if (par[row + 2].children[col].getAttribute("data-move") == "null" && par[row + 1].children[col].getAttribute("data-move") == "null") {
            whiteEatblack((row+2),col,element)
        }
        if (par[row + 1].children[col].getAttribute("data-move") == "null") {
            whiteEatblack((row+1),col,element)
        }
    }
    if (element.id == "first-time"  && element.getAttribute("team") !== "black" &&  par[row + 1]?.children[col].getAttribute("data-move") == "null" ) {
        whiteEatblack((row+1),col,element)
    } 
    if (element.id == "first-time"  && element.getAttribute("team") == "black" && par[row - 1]?.children[col].getAttribute("data-move") == "null") {
        whiteEatblack((row-1),col,element)
    }
    if (element.getAttribute("team") == "black") {
        if (par[row - 1].children[col + 1]?.querySelector("[team]")?.getAttribute("team") == "white") {
            whiteEatblack((row-1),(col+1),element)
        }
        if (par[row - 1].children[col - 1]?.querySelector("[team]")?.getAttribute("team") == "white") {
            whiteEatblack((row-1),(col-1),element)
        }
    }
    if (element.getAttribute("team") !== "black") {
        if (par[row + 1].children[col + 1]?.querySelector("[team]")?.getAttribute("team") == "black") {
            whiteEatblack((row+1),(col+1),element)
        }
        if (par[row + 1].children[col - 1]?.querySelector("[team]")?.getAttribute("team") == "black") {
            whiteEatblack((row+1),(col-1),element)
        }
    }
}
function rook(name,row,col,element) {
    if (name !== "ele") {reColor()}
    for (let i = col + 1; i < 8  ; i++) {if (!whiteEatblack(row,i,element)) {break}} 
    for (let i = col - 1; i > -1 ; i--) {if (!whiteEatblack(row,i,element)) {break}} 
    for (let i = row + 1; i < 8  ; i++) {if (!whiteEatblack(i,col,element)) {break}} 
    for (let i = row - 1; i > -1 ; i--) {if (!whiteEatblack(i,col,element)) {break}} 
}
function ele(name,row,col,element) {
    if (name == "mini") {reColor();rook("ele",row,col,element)} 
    else {reColor()}
    let temcol1 = col + 1
    for (let i = row + 1; i < 8 ; i++)  {if (!whiteEatblack(i,temcol1,element)) {break}temcol1++}
    let temcol2 = col - 1
    for (let i = row + 1; i < 8 ; i++)  {if (!whiteEatblack(i,temcol2,element)) {break}temcol2--} 
    let temcol3 = col + 1
    for (let i = row - 1; i >= 0 ; i--) {if (!whiteEatblack(i,temcol3,element)) {break}temcol3++} 
    let temcol4 = col - 1
    for (let i = row - 1; i >= 0 ; i--) {if (!whiteEatblack(i,temcol4,element)) {break}temcol4--}
}
function knight(row,col,element) {
    reColor()
    whiteEatblack((row + 2) , (col + 1) , element)
    whiteEatblack((row + 2) , (col - 1) , element)
    whiteEatblack((row - 2) , (col + 1) , element)
    whiteEatblack((row - 2) , (col - 1) , element)
    whiteEatblack((row + 1) , (col - 2) , element)
    whiteEatblack((row - 1) , (col - 2) , element)
    whiteEatblack((row + 1) , (col + 2) , element)
    whiteEatblack((row - 1) , (col + 2) , element)
}
function king(row , col , element) {
    reColor()
    whiteEatblack((row + 1) , col , element)
    whiteEatblack((row - 1) , col , element)
    whiteEatblack(row , (col + 1) , element)
    whiteEatblack(row , (col - 1) , element)
    whiteEatblack((row+1) ,(col+1), element)
    whiteEatblack((row-1) ,(col+1), element)
    whiteEatblack((row+1) ,(col-1), element)
    whiteEatblack((row-1) ,(col-1), element)
}
document.body.addEventListener("click", (element) => {
    if(element.target.classList.contains("red")) {
        if (!(element.target.getAttribute("data-move") === "null")) {
            document.querySelector("[element]").id = "first-time"
            element.target.querySelector("button").remove()
            element.target.append(document.querySelector("[element]"))
            document.querySelector("[element]").removeAttribute("element")
        } else {
            document.querySelector("[element]").id = "first-time"
            element.target.append(document.querySelector("[element]"))
            document.querySelector("[element]").removeAttribute("element")
        }
        reColor()
        checkMate()
        nextPlayer()
    }
})
function whiteEatblack(row , col , element) {
    let positionTEAM = par[row]?.children[col]?.querySelector("button")?.getAttribute("team") 
    let nextRole     = par[row]?.children?.[col]
    let ele           = element.getAttribute("team")
    if (ele == "black" && positionTEAM !== "black" && nextRole !== undefined) {
        if (positionTEAM == "white") {
            element.setAttribute("element","this")
            nextRole.style.backgroundColor = "red"
            nextRole.classList.add("red")
            return false;
        } else {
            element.setAttribute("element","this")
            nextRole.style.backgroundColor = "red"
            nextRole.classList.add("red")
            return true
        }
    } else if (ele == "white" && positionTEAM !== "white" && nextRole !== undefined) {
        if (positionTEAM == "black") {
            element.setAttribute("element","this")
            nextRole.style.backgroundColor = "red"
            nextRole.classList.add("red")
            return false
        } else {
            element.setAttribute("element","this")
            nextRole.style.backgroundColor = "red"
            nextRole.classList.add("red")
            return true
        }
    } 
    return false
}
function nextPlayer() {
    rota += 180
    typePla++
    document.querySelector(".grand-par").style.rotate = `${rota}deg`
    let opr = (typePla % 2 == 0) ? "white" : "black" 
    document.querySelectorAll("button").forEach(ele => {
        if (ele.getAttribute("team") == opr) {ele.disabled = true} 
        else {ele.disabled = false}})
}
function checkMate(){
    if (!(document.querySelectorAll(".king").length == 2)) {
        if (document.querySelector(".kwhite")) {winner("white")} 
        else (winner("black"))
    }
}
function winner(name) {
    par.forEach(ele => {
        Array.from(ele.children).forEach( e => {
            if (name == "white") {
                e.style.backgroundColor = "white"
                document.querySelectorAll("button").forEach(ele => {ele.remove()})
            } 
            else {e.style.backgroundColor = "black"
                document.querySelectorAll("button").forEach(ele => {ele.remove()})}
        })
    })
} 