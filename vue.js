        const info = new Vue({
            el: '#app',
            data: {
                sitename: 'Lessons',
                lessons: [],
                cart: [],
                showProduct: false,
                order: {
                    firstName: '',
                    lastName: '',
                },
                sort: 'ascending',
                type: '',
                user: {
                    name: '',
                    number: ''
                }
            },
            methods: {
                addToCart(lesson) {
                    this.lessons.find(item => item.id == lesson.id).availableInventory -= 1;
                    this.cart.push({ cartId: (this.cart.length + 1), ...lesson });
                },
                removeToCart(lesson) {
                    if (confirm('Do you want to delete this?')) {
                        this.cart = [...this.cart].filter(item => item.cartId != lesson.cartId)
                    }
                },
                showCheckout() {
                    this.showProduct = !this.showProduct;
                },
                submit() {
                    if (this.phonenumber(this.user.number)) {
                        alert('Order submited.')
                        console.log(this.user);
                    }
                },
                phonenumber(number) {
                    let phoneno = /^\d{11}$/;
                    if ((number.match(phoneno))) {
                        return true;
                    }
                    else {
                        alert("Phone number invalid.");
                        return false;
                    }
                }

            },
            computed: {
                total() {
                    return this.cart.length > 0 ? this.cart.map(item => item.price).reduce((acc, cur) => acc + cur) : 0;
                },
                sortedLessons() {
                    switch (this.type) {
                        case 'subject':
                            return this.lessons.sort((a, b) => {
                                switch (this.sort) {
                                    case 'ascending':
                                        return a.subject.toUpperCase() > b.subject.toUpperCase() ? 1 : -1;
                                    default:
                                        return a.subject.toUpperCase() < b.subject.toUpperCase() ? 1 : -1;
                                }
                            })
                        case 'location':
                            return this.lessons.sort((a, b) => {
                                switch (this.sort) {
                                    case 'ascending':
                                        return a.location.toUpperCase() > b.location.toUpperCase() ? 1 : -1;
                                    default:
                                        return a.location.toUpperCase() < b.location.toUpperCase() ? 1 : -1;
                                }
                            })
                        case 'price':
                            return this.lessons.sort((a, b) => {
                                return this.sort == 'ascending' ? a.price - b.price : b.price - a.price;
                            })
                        case 'space':
                            return this.lessons.sort((a, b) => {
                                return this.sort == 'ascending' ? a.availableInventory - b.availableInventory : b.availableInventory - a.availableInventory;
                            })
                        default:
                            return this.lessons.sort((a, b) => {
                                return this.sort == 'ascending' ? a.id - b.id : b.id - a.id;
                            })
                    }
                }
            },
            created() {
                this.lessons = lessons
            }
        });