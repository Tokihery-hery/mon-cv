
let tQuery = (el) => {
    return document.querySelector(el)
}
let tQueryAll = (el) => {
    return document.querySelectorAll(el)
}
let tGetId = (el) => {
    return document.getElementById(el)
}
let apChild = (selecteur, el) => {
    tGetId(selecteur).appendChild(el)
}
let crEl = (el) => {
    return document.createElement(el)
}
let screenH = () => {
    tQuery(".fullScreenimg").style.display = "flex"
    tQuery(".fullScreenimg").style.flexDirection = "column"
    tQuery(".plus-similaire").style.flexDirection = "row"
    tQuery(".plus-similaire").setAttribute('class', 'plus-similaire overflow')
}
let screenV = () => {
    tQuery(".fullScreenimg").style.display = "flex"
    tQuery(".fullScreenimg").style.flexDirection = "row"
    tQuery(".plus-similaire").style.flexDirection = "column"
    tQuery(".plus-similaire").setAttribute('class', 'plus-similaire')
}
porfolio.map(e => {
    let createDiv = crEl('div')
    let btn = crEl("button")
    let span = crEl('span')
    let imgTag = crEl('img')
    let h5 = crEl('h5')
    createDiv.setAttribute('class', 'portfoliolist')
    createDiv.setAttribute('id', `portfoliolist_${e.id}`)
    tQuery('.exemple').appendChild(createDiv)
    btn.setAttribute('id', `btn_${e.id}`)
    span.textContent = "..."
    imgTag.setAttribute('src', `${e.images}`)
    imgTag.setAttribute('id', `images_${e.id}`)
    imgTag.setAttribute('class', 'imgPort')
    h5.setAttribute('id', `desc_${e.id}`)
    h5.textContent = e.description
    apChild(`portfoliolist_${e.id}`, btn)
    apChild(`btn_${e.id}`, span)
    apChild(`portfoliolist_${e.id}`, imgTag)
    apChild(`portfoliolist_${e.id}`, h5)
}
)
let doc = tQueryAll('div.exemple>div')
let plus = tQuery('.plus-button-contenu-menu')
let eld, similaire
let ok = true
let offsetWidthImg
let io = tQueryAll('img.imgPort')
let caption
for (let j = 0; j < io.length; j++) {
    let p = io[j].getAttribute('id').split('_')[1] - 1

    io[j].addEventListener('click', () => {
        if (tQuery('.container').offsetWidth >=770) {
            tQuery(".img-y img").setAttribute('src', porfolio[p].images)
            tQuery(".img-y p").innerText = porfolio[p].description
            tQuery('.fullScreenimg').style.top = "42px";
            tQuery(".img-y img").addEventListener('mouseenter', () => {
                if (tQuery(".img-y img").offsetHeight < 330) {
                    tQuery(".img-y img").style.transform = "scale(2.2)"
                } else if (tQuery(".img-y img").offsetWidth < 500) {
                    tQuery(".img-y img").style.transform = "scale(1.6)"
                }
            })
            tQuery(".img-y img").addEventListener('mouseleave', () => {
                if (tQuery(".img-y img").offsetHeight < 330) {
                    tQuery(".img-y img").style.transform = "scale(1)"
                } else if (tQuery(".img-y img").offsetWidth < 500) {
                    tQuery(".img-y img").style.transform = "scale(1)"
                }
            })
            if (tQueryAll('.similaire').length === 0) {
                porfolio.map(e => {
                    similaire = crEl('div')
                    similaire.setAttribute('class', `similaire`)
                    similaire.setAttribute('id', `img_${e.id}`)
                    tQuery(".plus-similaire").appendChild(similaire)
                    eld = crEl('img')
                    eld.setAttribute('src', e.images)
                    caption = crEl('h5')
                    caption.innerText = e.description
                    tQuery(`.similaire#img_${e.id}`).appendChild(eld)
                    tQuery(`.similaire#img_${e.id}`).appendChild(caption)
                    tQuery(`.similaire#img_${e.id}`).addEventListener('click', () => {
                        if (tQuery('.fullScreenimg').offsetWidth > 1000) {
                            screenH()
                            tQuery('.img-y img').setAttribute('class', 'imgSimilaireH')
                        } else {
                            screenV()
                            tQuery('.img-y img').setAttribute('class', 'imgSimilaireV')
                        }
                        tQuery(".img-y p").innerText = porfolio[e.id - 1].description
                        tQuery(".img-y img").setAttribute('src', porfolio[e.id - 1].images)
                    })

                })
            } else { }
            tQuery('span#close').addEventListener('click', () => {
                tQuery('.fullScreenimg').style.top = "1900px";
            })

            if (tQuery('.img-y img').offsetWidth > 1000) {
                screenH()
            } else {
                screenV()
            }
        }
    })
}


for (let i = 0; i < doc.length; i++) {
    let btn = doc[i].getElementsByTagName('button')[0]
    let ps = doc[i].getAttribute('id').split('_')[1] - 1
    doc[i].addEventListener('mouseenter', () => {
        btn.style.transform = "scale(1)"
        btn.addEventListener('click', () => {
            plus.style.display = 'block'
            plus.querySelector('.gitRepo').setAttribute('href', porfolio[ps].gitRepository)
            plus.querySelector('.gitPage').setAttribute('href', porfolio[ps].gitPage)
            plus.querySelector('.gitRepo').innerText = `Repository git (${porfolio[ps].description})`
            plus.querySelector('.gitPage').innerText = `GitHub pages (${porfolio[ps].description})`
            plus.querySelector('.lienPage').innerText = `${porfolio[ps].gitPage}`
            plus.querySelector('.lienRepos').innerText = `${porfolio[ps].gitRepository}`
            if (ok) btn.before(plus)
            if (!ok) { plus.style.display = "none"; btn.style.transform = "scale(0)"; } else { plus.style.display = "flex" }
            if (!ok) {
                doc[i].addEventListener('mouseleave', () => {
                    btn.style.transform = "scale(0)"
                    style.background = "initial"
                })
            }
        })
    })
    doc[i].addEventListener('mouseleave', () => {
        btn.style.transform = "scale(0)"
        plus.style.display = "none"
    })
}
let showPlus = (el, template) => {
    ok ? el.before(template) : template.style.display = "none"
}
let showYesorNo = false
let showNav = () => {
    showYesorNo = !showYesorNo
    if (showYesorNo) {
        tQuery('.header ul').style.display = "flex"
        tQuery('.tooglenav').style.height = "inherit"
    } else {
        tQuery('.header ul').style.display = "none"
        tQuery('.tooglenav').style.height = "38px"
    }
}
tQuery('.header ul').addEventListener('click', () => {
    if (tQuery('.img-y img').getAttribute('src') != "") {
        tQuery('.fullScreenimg').style.top = "1900px";
    }
})
