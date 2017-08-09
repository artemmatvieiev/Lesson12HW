const enterButtonsId = document.getElementById("enterButtons")
const loginId = document.getElementById("login")
const registrationId = document.getElementById("registration")
const regBtnsId = document.getElementById("regBtns")
const loginBtnsId = document.getElementById("loginBtns")
const loginOkId = document.getElementById("loginOk")
const errorLoginId = document.getElementById("errorLogin")
const exitId = document.getElementById("exit")
const reg = {
	["username"]: /^[A-Z]{1}[a-z]{2,}$/,
	["password"]: /^[0-9a-z]{8,}$/,
	["tel"]: /^[0-9]{3}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/,
	["email"]: /^[A-Za-z0-9]+\@[a-z]+\.[a-z]{2,}$/
}
const btnBlock = []
const clearForm = function (formChildren) {
	for(let i of formChildren) {
		i.previousElementSibling.classList.remove("error")
		i.value = ""
		i.style.borderColor = "#ccc"
		i.parentNode.lastElementChild.firstElementChild.disabled = false
	}
	btnBlock.splice(0, btnBlock.length)
}
const blockSubmit = function (target) {
	if(btnBlock.length) 
		target.parentNode.lastElementChild.firstElementChild.disabled = true
	else 
		target.parentNode.lastElementChild.firstElementChild.disabled = false
}
const validateReg = function (reg, target) {
	if(reg.test(target.value)){
		target.previousElementSibling.classList.remove("error")
		target.style.borderColor = "#ccc"
		btnBlock.pop()
		blockSubmit(target)
		return true
	}
	target.previousElementSibling.classList.add("error")
	target.style.borderColor = "red"
	if(!btnBlock.some(function (elem) {
		 return elem == target
	})) 
		btnBlock.push(target)
	blockSubmit(target)
	return false
}