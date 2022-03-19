import Backbone from "backbone";

export const NotificationWindow = Backbone.View.extend({
    el: '.notification-container',
    initialize() {
        this.$container = document.querySelector('.notification-container');
        this.$button = this.$container.querySelector('.delete');
        this.$button.addEventListener('click', () => {
            this.$container.style.visibility = 'hidden';
        });
    },
    open(message) {
        const notify = this.$container.querySelector('.notification');
        const textBlock = notify.querySelector('p');
        this.$container.style.visibility = 'visible';
        textBlock.textContent = message;
    }
})