const onBluRegistration = function (event) {
	return new Promise((res,rej) => {
		const {target: {dataset: {input}}, target} = event
		if(validateReg(reg[input], target)) return res()
		return rej()
	})
}
const onClickButtons = function (event) {
	const {target: {dataset: {btn}}, target} = event
	switch(btn) {
		case "login": {
			loginId.style.display = "flex"
			target.parentNode.style.display = "none" 
			break
		}
		case "registration": {
			registrationId.style.display = "flex"
			target.parentNode.style.display = "none" 
			break
		}
	}
}
const onClickRegBtns = function (event) {
	const {target: {dataset: {btnvalue}}, target} = event
	const formChildren = target.parentNode.parentNode.getElementsByTagName("input")
	event.preventDefault()
	switch(btnvalue) {
		case "submit": {
			for(let i of formChildren) {
				if(!i.value) {
					console.log(i)
					i.parentNode.lastElementChild.firstElementChild.disabled = true
					i.previousElementSibling.classList.add("error")
					i.style.borderColor = "red"
					btnBlock.push(i)
				}
			}
			if(!btnBlock.length) {
				switch(target.parentNode.id) {
					case regBtnsId.id: {
						const user = {}
						let users = []
						if(JSON.parse(localStorage.getItem("json")))
							 users = users.concat(JSON.parse(localStorage.getItem("json")))
						for(let i of formChildren) {
							user[i.dataset.input] = i.value
						}
						users.push(user)
						localStorage.setItem("json", JSON.stringify(users))				
						target.parentNode.parentNode.style.display = "none"
						enterButtonsId.style.display = "block" 
						clearForm(formChildren)
						enterButtonsId.lastElementChild.style.display = "none"
						alert("Поздравляем! Вы успешно зарегистрировались. Теперь вы можете войти.")
						break
					} 
					case loginBtnsId.id: {
						const user = {}
						for(let i of formChildren) {
							user[i.dataset.input] = i.value
						}
						const users = JSON.parse(localStorage.getItem("json"))
						for(let j of users) {
							if(
									(user["username"] == j["username"])
									&&
									(user["password"] == j["password"])
							){
								target.parentNode.parentNode.style.display = "none"
								clearForm(formChildren)
								loginOkId.style.display = "block"
								loginOkId.firstElementChild.innerText = `${user["username"]}`
								alert(`Здравствуйте! Вы вошли как ${user["username"]}`)
							} else {
								errorLoginId.style.display = "block"
							}
						}
						break
					}
				}
			}
			break
		}
		case "cancel": {
			target.parentNode.parentNode.style.display = "none"
			enterButtonsId.style.display = "block" 
			errorLoginId.style.display = "none"
			clearForm(formChildren)
			break
		}
	}
}
const onClickExit = function (event) {
	loginOkId.firstElementChild.innerText = ""
	loginOkId.style.display = "none"
	enterButtonsId.style.display = "block" 
	enterButtonsId.lastElementChild.style.display = "inline-block"
	errorLoginId.style.display = "none"
}