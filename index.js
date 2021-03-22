const { Plugin } = require('powercord/entities');

module.exports = class RemoveInviteFromUserContextMenu extends Plugin {
    async startPlugin () {
        this.loadStylesheet('style.css');
    }
}
