export class Router {
	routes = {}
	add(routeName, page) {
		this.routes[routeName] = page
	}
	route(event) {
		event = event || window.event
		event.preventDefault()
		window.history.pushState({}, '', event.target.href)
		this.handle()
	}
	handle() {
		const { pathname } = window.location
		const route = this.routes[pathname] || this.routes['/home']
		console.log(pathname)
		fetch(route)
			.then((data) => data.text())
			.then((html) => {
				document.querySelector('#app').innerHTML = html
			})

		switch (pathname) {
			case '/universe':
				document.querySelector('body').style.backgroundImage =
					'url(./assets/pagina2.png)'
					break
			case '/exploration':
				document.querySelector('body').style.backgroundImage =
					'url(./assets/pagina3.png)'
		}

		document.querySelectorAll('.nav-link').forEach((link) => {
			link.classList.remove('active')
			if (link.href === window.location.href) {
				link.classList.add('active')
			}
		})
	}
}
