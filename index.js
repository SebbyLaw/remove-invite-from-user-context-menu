const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const { findInReactTree } = require('powercord/util');


module.exports = class SuperDeveloperMode extends Plugin {
    async startPlugin () {

        const dmUserContextMenu = await getModule(m => m.default?.displayName === "DMUserContextMenu");
        const groupDmUserContextMenu = await getModule(m => m.default?.displayName === "GroupDMUserContextMenu");
        const guildUserContextMenu = await getModule(m => m.default?.displayName === "GuildChannelUserContextMenu");

        inject(
            "remove-invite-from-user-context-menu-dmContextPatch",
            dmUserContextMenu,
            "default",
            this.contextPatch
        );
        inject(
            "remove-invite-from-user-context-menu-groupDmContextPatch",
            groupDmUserContextMenu,
            "default",
            this.contextPatch
        );
        inject(
            "remove-invite-from-user-context-menu-guildUserContextPatch",
            guildUserContextMenu,
            "default",
            this.contextPatch
        );
    }

    pluginWillUnload() {
        uninject("remove-invite-from-user-context-menu-dmContextPatch");
        uninject("remove-invite-from-user-context-menu-groupDmContextPatch");
        uninject("remove-invite-from-user-context-menu-guildUserContextPatch");
    }

    contextPatch(args, res) {
        res.props.children.props.children[4].props.children[3] = null;
        return res;
    }
}
