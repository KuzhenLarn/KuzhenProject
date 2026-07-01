//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_ShopCommonEvents
 * 
 * If VisuStella MZ's Shop Common Events is present, you can utilize its
 * Common Event function to trigger upon crafting items, weapons, and/or armors
 * to take the player outside of the shop and returning back.
 * 
 * The following notetags will become usable:
 * 
 *   <Once Craft Common Event: id>
 * 
 *   <Once Craft Common Event Switch: id>
 *   <Once Craft Common Event All Switches: id, id, id>
 *   <Once Craft Common Event Any Switches: id, id, id>
 * 
 *   <Repeat Craft Common Event: id>
 *
 *   <Repeat Craft Common Event Switch: id>
 *   <Repeat Craft Common Event All Switches: id, id, id>
 *   <Repeat Craft Common Event Any Switches: id, id, id>
 * 
 * The following Plugin Commands will become usable:
 * 
 *   Scene: Common Event Return
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Crafting Common Event Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event: id>
 * <Repeat Craft Common Event: id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_2_ShopCommonEvents!
 * - This will cause a specific Common Event to launch when crafted.
 * - Replace 'id' with a number representing the ID of the Common Event that
 *   you wish to launch upon this item being crafted.
 * - The "Once" notetag variant will only occur once when crafted.
 *   - Any subsequent purchases of the item will not launch the Common Event.
 * - The "Repeat" notetag variant will occur repeatedly when crafted.
 * - If both "Once" and "Repeat" notetags are present in the item, then the
 *   "Once" variant will take priority first. Any subsequent purchases will go
 *   to the "Repeat" variant.
 * - Any switch requirement notetags need to be met in order for either
 *   notetag to have any effect.
 * - Use the Plugin Command "Scene: Common Event Return" to return back to the
 *   last Item Crafting scene.
 *
 * ---
 * 
 * === Crafting Common Event Requirement-Related Notetags ===
 * 
 * ---
 *
 * <Once Craft Common Event Switch: id>
 * <Once Craft Common Event All Switches: id, id, id>
 * <Once Craft Common Event Any Switches: id, id, id>
 *
 * <Repeat Craft Common Event Switch: id>
 * <Repeat Craft Common Event All Switches: id, id, id>
 * <Repeat Craft Common Event Any Switches: id, id, id>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires the respective Craft Common Events to have these Switches enabled
 *   in the "ON" position in order for them to launch.
 *   - "Once" variant will only affect the "Once" notetag variants.
 *   - "Repeat" variant will only affect the "Repeat" notetag variants.
 * - The "All" variant will require all listed Switch ID's to be "ON".
 * - The "Any" variant will require only one listed Switch ID to be "ON".
 * - Replace 'id' with a number representing the Switch ID that needs to be in
 *   the "ON" position for the requirement to be met.
 *   - Insert multiple 'id' to require more Switch ID's.
 *
 * ---
 * 
 * === Batch-Related Notetags ===
 * 
 * ---
 *
 * <Craft Batch>
 *  listing
 *  listing
 *  listing
 * </Craft Batch>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Requires VisuMZ_3_ShopBatches!
 * - Creates a list of items, weapons, and armors that the player will gain
 *   when this batch object is crafted.
 *   - This also means that in addition to this notetag, the notetag for
 *     <Crafting Ingredients> is also needed.
 *   - This item will also not be masked.
 * - Proxy items, weapons, or armors cannot be listed and will be bypassed.
 * - This item, weapon, or armor cannot be crafted if all of the listed items,
 *   weapons, or armors are at max quantity within the party's inventory.
 * - The listed items will NOT utilize any on craft effects for the individual
 *   listed items themselves.
 * - Replace 'listing' with any of the listing types found below:
 * 
 *     Item id
 *     Item name
 *     Weapon id
 *     Weapon name
 *     Armor id
 *     Armor name
 * 
 *     Item id: quantity
 *     Item name: quantity
 *     Weapon id: quantity
 *     Weapon name: quantity
 *     Armor id: quantity
 *     Armor name: quantity
 * 
 *   - Replace 'id' with a number representing the ID of the item, weapon, or
 *     armor that is to be listed.
 *   - Replace 'name' with the associated item, weapon, or armor's name.
 *   - Replace 'quantity' with a number representing the number of items,
 *     weapons, or armors that will be acquired when the batch item is crafted.
 *     - If the variant without 'quantity' is used, quantity will default to 1.
 * 
 *   Examples:
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item Potion: 10
 *    Item Super Potion: 5
 *    Weapon Short Sword: 3
 *    Weapon Long Sword: 2
 *    Armor Linen Clothing: 4
 *    Armor Cloth Armor: 3
 *   </Craft Batch>
 * 
 *   ---
 * 
 *   <Craft Batch>
 *    Item 7: 10
 *    Item 8: 5
 *    Weapon 1: 3
 *    Weapon 2: 2
 *    Armor 2: 4
 *    Armor 8: 3
 *   </Craft Batch>
 * 
 *   ---
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * Scene: Common Event Return
 * - Return to the last shop if coming from a Crafting Common Event.
 * - Requires VisuMZ_2_ShopCommonEvents!
 * 
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
 *
 * ---
 * 
 * Custom Layout
 * 
 *   Added in version 1.20
 * 
 *   Enable Custom Layout:
 *   - Enable a custom layout or automatically create a layout based on the
 *     shop scene?
 * 
 *   Help Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Category Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for the ingredients title window.
 * 
 *   Gold Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 *   Item Window JS:
 *   - Code used to determine the dimensions for this window.
 *   - These settings are also used for ingredients list and number windows.
 * 
 *   Status Window JS:
 *   - Code used to determine the dimensions for this window.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.20: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a crash that would cause a conflict with related non-crafting
 *    scenes. Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Windows > Custom Layout
 * **** By enabling this, you can use JS to determine the window positions you
 *      want to layout in the item crafting scene. Otherwise, if left disabled,
 *      the plugin will automatically utilize the layout found in the shop
 *      scene to determine where the windows will go.
 * 
 * Version 1.19: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Craft Batch>
 * **** When this "item" is crafted, yields multiples of the listed item.
 * **** Requires VisuMZ_3_ShopBatches
 * 
 * Version 1.18: August 4, 2022
 * * Bug Fixes!
 * ** Crafting an item on a different tab than the first will no longer reset
 *    back to the first tab. Fix made by Irina.
 * 
 * Version 1.17: July 14, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: May 12, 2022
 * * Compatibility Update
 * ** Compatibility with VisuMZ Shop Common Events added.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Irina and sponsored by MirageV:
 * *** <Once Craft Common Event: id>
 * *** <Repeat Craft Common Event: id>
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** This will cause a specific Common Event to launch when crafted.
 * *** <Once Craft Common Event Switch: id>
 * *** <Once Craft Common Event All Switches: id, id, id>
 * *** <Once Craft Common Event Any Switches: id, id, id>
 * *** <Repeat Craft Common Event Switch: id>
 * *** <Repeat Craft Common Event All Switches: id, id, id>
 * *** <Repeat Craft Common Event Any Switches: id, id, id>
 * **** Requires the respective Craft Common Events to have these Switches
 *      enabled in the "ON" position in order for them to launch.
 * ** New Plugin Command added by Irina and sponsored by MirageV:
 * *** Scene: Common Event Return
 * **** Requires VisuMZ_2_ShopCommonEvents!
 * **** Return to the last shop if coming from a Crafting Common Event.
 * 
 * Version 1.15: April 7, 2022
 * * Feature Update!
 * ** Any disappearing categories as a result of hiding recipes after crafting
 *    an item will result in the first category being selected.
 * 
 * Version 1.14: March 31, 2022
 * * Feature Update!
 * ** Failsafe added for situations where if the game dev decides to force an
 *    impossible situation in the Item Crafting scene (such as turning on a
 *    switch that erases all recipes), then the Item Scene will automatically
 *    exit out of it with zero prompts. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ReturnToLastCrafting
 * @text Scene: Common Event Return
 * @desc Return to the last shop if coming from a Crafting Common Event.
 * Requires VisuMZ_2_ShopCommonEvents!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemCraftingSys
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0","Custom":"","EnableCustomLayout:eval":"false","HelpWindow_RectJS:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","CategoryWindow_RectJS:func":"\"const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow_RectJS:func":"\"const ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ItemWindow_RectJS:func":"\"const wy = this._commandWindow.y + this._commandWindow.height;\\nconst ww = Graphics.boxWidth - this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow_RectJS:func":"\"const ww = this.statusWidth();\\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\\nconst wy = this._commandWindow.y + this._commandWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param Custom
 * @text Custom Layout
 *
 * @param EnableCustomLayout:eval
 * @text Enable Custom Layout
 * @parent Custom
 * @type boolean
 * @on Custom
 * @off Automatic
 * @desc Enable a custom layout or automatically create a layout
 * based on the shop scene?
 * @default false
 *
 * @param HelpWindow_RectJS:func
 * @text Help Window JS
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CategoryWindow_RectJS:func
 * @text Category Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wx = this.isRightInputMode() ? this.mainCommandWidth() : 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth - this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow_RectJS:func
 * @text Gold Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(1, true);\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ItemWindow_RectJS:func
 * @text Item Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const wy = this._commandWindow.y + this._commandWindow.height;\nconst ww = Graphics.boxWidth - this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow_RectJS:func
 * @text Status Window
 * @parent Custom
 * @type note
 * @desc Code used to determine the dimensions for these windows.
 * @default "const ww = this.statusWidth();\nconst wh = this.mainAreaHeight() - this._commandWindow.height;\nconst wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;\nconst wy = this._commandWindow.y + this._commandWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

function _0x1566(_0x49de21,_0x277740){const _0x20b154=_0x20b1();return _0x1566=function(_0x1566a3,_0x4c32e9){_0x1566a3=_0x1566a3-0x1e3;let _0x2611e9=_0x20b154[_0x1566a3];return _0x2611e9;},_0x1566(_0x49de21,_0x277740);}const _0x4ff796=_0x1566;(function(_0x4c8b99,_0x45073b){const _0x30bee7=_0x1566,_0x57bb88=_0x4c8b99();while(!![]){try{const _0x1b4bb2=parseInt(_0x30bee7(0x21d))/0x1+parseInt(_0x30bee7(0x2de))/0x2*(parseInt(_0x30bee7(0x248))/0x3)+parseInt(_0x30bee7(0x2f9))/0x4+parseInt(_0x30bee7(0x391))/0x5*(parseInt(_0x30bee7(0x381))/0x6)+parseInt(_0x30bee7(0x256))/0x7+-parseInt(_0x30bee7(0x3f4))/0x8+-parseInt(_0x30bee7(0x364))/0x9*(parseInt(_0x30bee7(0x43e))/0xa);if(_0x1b4bb2===_0x45073b)break;else _0x57bb88['push'](_0x57bb88['shift']());}catch(_0x1eab04){_0x57bb88['push'](_0x57bb88['shift']());}}}(_0x20b1,0xf0162));var label=_0x4ff796(0x367),tier=tier||0x0,dependencies=[_0x4ff796(0x233)],pluginData=$plugins[_0x4ff796(0x2a0)](function(_0xe72d1d){const _0x184bc6=_0x4ff796;return _0xe72d1d[_0x184bc6(0x34c)]&&_0xe72d1d[_0x184bc6(0x47f)][_0x184bc6(0x24c)]('['+label+']');})[0x0];VisuMZ[label][_0x4ff796(0x454)]=VisuMZ[label][_0x4ff796(0x454)]||{},VisuMZ[_0x4ff796(0x462)]=function(_0x4da0ba,_0x36f2dd){const _0x44929f=_0x4ff796;for(const _0x41467a in _0x36f2dd){if(_0x44929f(0x3ae)!==_0x44929f(0x3ae)){_0x5b62c5=_0x31becc||0x1,this[_0x44929f(0x306)](![]);const _0x56a74f=_0x5c1bf6[_0x44929f(0x479)](),_0x2058a9=_0x2e5fac[_0x44929f(0x2d4)](),_0x3969da=_0xa2422f[_0x44929f(0x3f0)]/0x2,_0x171048=this[_0x44929f(0x39a)]();while(_0xf90823--){this[_0x44929f(0x253)][_0x44929f(0x263)](_0x2fb709['x'],_0x174a7f['y'],_0x3969da,_0x171048,_0x2058a9,_0x56a74f),this[_0x44929f(0x253)][_0x44929f(0x263)](_0x25dfa7['x']+_0x3969da,_0x4d65d7['y'],_0x3969da,_0x171048,_0x56a74f,_0x2058a9);}this[_0x44929f(0x306)](!![]);}else{if(_0x41467a[_0x44929f(0x48c)](/(.*):(.*)/i)){const _0x48f07f=String(RegExp['$1']),_0x3f17bc=String(RegExp['$2'])[_0x44929f(0x35b)]()[_0x44929f(0x2b5)]();let _0x68a8d6,_0x29ed9d,_0x4e725e;switch(_0x3f17bc){case'NUM':_0x68a8d6=_0x36f2dd[_0x41467a]!==''?Number(_0x36f2dd[_0x41467a]):0x0;break;case _0x44929f(0x46a):_0x29ed9d=_0x36f2dd[_0x41467a]!==''?JSON['parse'](_0x36f2dd[_0x41467a]):[],_0x68a8d6=_0x29ed9d[_0x44929f(0x43a)](_0x425b28=>Number(_0x425b28));break;case _0x44929f(0x2a7):_0x68a8d6=_0x36f2dd[_0x41467a]!==''?eval(_0x36f2dd[_0x41467a]):null;break;case _0x44929f(0x287):_0x29ed9d=_0x36f2dd[_0x41467a]!==''?JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a]):[],_0x68a8d6=_0x29ed9d[_0x44929f(0x43a)](_0x58d951=>eval(_0x58d951));break;case _0x44929f(0x261):_0x68a8d6=_0x36f2dd[_0x41467a]!==''?JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a]):'';break;case _0x44929f(0x37d):_0x29ed9d=_0x36f2dd[_0x41467a]!==''?JSON['parse'](_0x36f2dd[_0x41467a]):[],_0x68a8d6=_0x29ed9d[_0x44929f(0x43a)](_0x1b97bd=>JSON[_0x44929f(0x35a)](_0x1b97bd));break;case'FUNC':_0x68a8d6=_0x36f2dd[_0x41467a]!==''?new Function(JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a])):new Function(_0x44929f(0x298));break;case _0x44929f(0x329):_0x29ed9d=_0x36f2dd[_0x41467a]!==''?JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a]):[],_0x68a8d6=_0x29ed9d[_0x44929f(0x43a)](_0x57e570=>new Function(JSON['parse'](_0x57e570)));break;case _0x44929f(0x201):_0x68a8d6=_0x36f2dd[_0x41467a]!==''?String(_0x36f2dd[_0x41467a]):'';break;case'ARRAYSTR':_0x29ed9d=_0x36f2dd[_0x41467a]!==''?JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a]):[],_0x68a8d6=_0x29ed9d['map'](_0xb4ecf7=>String(_0xb4ecf7));break;case'STRUCT':_0x4e725e=_0x36f2dd[_0x41467a]!==''?JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a]):{},_0x68a8d6=VisuMZ['ConvertParams']({},_0x4e725e);break;case _0x44929f(0x27c):_0x29ed9d=_0x36f2dd[_0x41467a]!==''?JSON[_0x44929f(0x35a)](_0x36f2dd[_0x41467a]):[],_0x68a8d6=_0x29ed9d['map'](_0x4e3067=>VisuMZ['ConvertParams']({},JSON['parse'](_0x4e3067)));break;default:continue;}_0x4da0ba[_0x48f07f]=_0x68a8d6;}}}return _0x4da0ba;},(_0x1f884b=>{const _0x150af9=_0x4ff796,_0x329b85=_0x1f884b['name'];for(const _0x2f89b5 of dependencies){if(!Imported[_0x2f89b5]){if(_0x150af9(0x368)!=='cIztW')this['_numberWindow'][_0x150af9(0x309)](_0x20a570['NumberBgType']);else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x150af9(0x3d7)](_0x329b85,_0x2f89b5)),SceneManager['exit']();break;}}}const _0x381e31=_0x1f884b[_0x150af9(0x47f)];if(_0x381e31['match'](/\[Version[ ](.*?)\]/i)){const _0x4a73f9=Number(RegExp['$1']);_0x4a73f9!==VisuMZ[label]['version']&&(alert(_0x150af9(0x2d0)['format'](_0x329b85,_0x4a73f9)),SceneManager[_0x150af9(0x2f2)]());}if(_0x381e31[_0x150af9(0x48c)](/\[Tier[ ](\d+)\]/i)){if(_0x150af9(0x45a)!==_0x150af9(0x2cf)){const _0x5c6061=Number(RegExp['$1']);_0x5c6061<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x150af9(0x3d7)](_0x329b85,_0x5c6061,tier)),SceneManager['exit']()):tier=Math[_0x150af9(0x3dc)](_0x5c6061,tier);}else _0x4ba603=this[_0x150af9(0x3b9)][_0x150af9(0x351)];}VisuMZ[_0x150af9(0x462)](VisuMZ[label][_0x150af9(0x454)],_0x1f884b[_0x150af9(0x229)]);})(pluginData);if(VisuMZ[_0x4ff796(0x202)]['version']<1.38){let text='';text+=_0x4ff796(0x404),text+='in\x20order\x20for\x20VisuMZ_2_ItemCraftingSys\x20to\x20work.',alert(text),SceneManager['exit']();}function _0x20b1(){const _0x4be28e=['ItemWindow_RectJS','itemCraftingNumberWindowOk','onDatabaseLoaded','uhMSl','isRightInputMode','boxWidth','\x20+\x20','You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.','_animationIDs','nWNPz','name','lXiAT','isPlaying','ReturnToLastCrafting','armors','show','setValue','itemRect','tPsRa','setItem','sMfls','doesItemHaveOpenCategories','ItemScene','ifmZw','RJsEd','status','deactivate','drawTotalPrice','postCreateItemWindowModernControls','currentExt','items','TurnSwitches','MaskItalics','Qdalz','_itemIDs','scaleSprite','OkYDh','maxCols','isItemCraftingCategoryValid','parse','toUpperCase','drawMathMarks','itemCraftingIngredientsBridge','setStatusWindow','determineMax','hPjUw','ItemCraftingMenuCommand','addCommand','armor-%1','9ZpVOOf','statusWidth','windowskin','ItemCraftingSys','cIztW','_amount','craftableWeapons','commandWindowRectItemsEquipsCore','CheckAnySwitches','createStatusWindow','XSgUS','VBiCk','AUCNh','setup','AnySwitches','CHiId','setWindowBackgroundTypes','YobTg','initItemCraftingMainMenu','_statusWindow','initialize','baseTextRect','RegExp','createCommandWindow','zWUyU','ARRAYJSON','ParseItemNotetags','isShowNew','Window','312lFxobL','makeItemList','_backSprite1','NumWindowOwned','changeTextColor','BypassSwitches','itemHasCraftCommonEvent','Scene_Menu_createCommandWindow','buttonAssistKey2','constructor','meetsCraftingCommonEventSwitches','LxpYf','cJqVJ','loadPicture','goldWindowRectJS','drawCurrentItemName','156265VqcIPK','smooth','IngredientList','ShowMainMenu','calcCraftBatchItemsMax','categories','ShowWindows','addUncategorizedItemCategory','_ingredientCategories','lineHeight','checkItemCraftingResultsValid','shift','HelpBgType','ItemCraftingSceneOpen','qqNij','clone','setupSelectIngredientWindow','Enable','onItemOk','LJkHD','itemCraftingMask','addOriginalCommands','XDVWO','FWJbq','buttonY','gold','EnableMainMenu','armor','ButtonAssistBgType','iIRpq','_backSprite2','SelectedColor','buttonAssistItemListRequirement','destroyItemSprite','CraftRepeat','Gold','HRMXP','goldWindowRect','GoldIcon','itemPadding','_craftingEvents','isCraftItemListed','buttonAssistText2','concat','drawIcon','boxHeight','VVMNz','setMainMenuItemCraftingVisible','KBTlS','Animation','VisuMZ_2_ShopCommonEvents','_helpWindow','bitmap','CraftBatchWrap','XOEeX','sOglt','isUseModernControls','Window_MenuCommand_addOriginalCommands','playStaticSe','_windowLayer','Animations','registerCommand','helpWindowRect','Net','loadSystem','_customItemCraftingSettings','isTouchOkEnabled','registerCraftingEvent','rXRXu','tooltipFrameCheckRequirements','format','itemNameY','drawCraftedIcon','categoryWindowRectJS','weapon','max','onIngredientListCancel','setItemForCraftBatchContents','numItems','pQtqU','AKefO','_allCraftableWeapons','drawShopBatchContentsRemaining','item-%1','shown','parseCraftingIngredientsData','isMainMenuItemCraftingVisible','maskItalics','isProxyItem','bigPicture','_commandWindow','bEwsU','mainAreaHeight','Uncategorized','scrollTo','width','onAnimationFinish','Type','createJS','11347888lqlELn','cwQUZ','removeChild','maskItemName','SiVaV','_ingredientAmounts','categoryList','hasCraftBatchItems','ShopScene','isItemCrafted','OLzBN','iYFWL','terminate','aBcwa','isMainMenuItemCraftingEnabled','mqEUO','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','calcWindowHeight','statusWindowRect','_context','hasCustomWindowSkin','IngredientTitle','left','ParseArmorNotetags','rTAML','reserveCommonEvent','SZAuJ','finishAnimation','CategoryTitle','worldTransform','sxFOO','BgFilename1','iconHeight','eGlLJ','drawCraftBatchContents','Window_Selectable_select','loseGold','MainMenu','currencyUnit','drawShopBatchContentsItem','drawBigItemImage','fJchH','split','shouldDrawCraftBatchContents','GIxvD','SwitchCraft','allItems','setBackgroundOpacity','_number','scale','updateAnimationSprite','powerDownColor','Hhcay','makeCommandList','currentCraftableItems','systemColor','getItemIdWithName','clearCustomItemCraftingSettings','CraftEventRepeat','playCancel','EnSbW','YuKEZ','Mask','isSceneBattle','NDMWC','windowPadding','createItemSprite','isItemCraftingCommandVisible','isArmor','allCraftableItems','map','isOkEnabled','adjustSprite','visualGoldDisplayNoCost','44067230eYMdOw','drawShopBatchContentsTitle','addItemCategory','isSceneItemCrafting','isCustomLayout','createGoldWindow','FvQhy','round','centerSprite','ItemCraftingNoCategory','buyWindowRectItemsEquipsCore','refresh','Window_ItemCategory_addItemCategory','Show','addItemCraftingCommandAutomatically','%1/%2','setMainMenuItemCraftingEnabled','Window_ShopStatus_refresh','Sound','drawTooltipBackground','UjeLQ','hide','Settings','pop','hasCraftingEventOccurred','sWaUE','onNumberOk','right','uSwBm','_craftingCommonEventScene','update','StatusWindow_RectJS','select','isFinishedAnimating','onButtonOk','customCraftingOnly','ConvertParams','Parse_Notetags_CreateJS','isWeapon','process_VisuMZ_ItemCraftingSys_Notetags','clearUserSelectedIngredients','cursorWidth','TCiJS','setHelpWindow','ARRAYNUM','NVzgJ','VisuMZ_3_ShopBatches','rOOwJ','returnBackToItemWindow','maxItems','AllSw','tooltipSkin','initItemCraftingEvents','ceil','all','goto','buttonAssistText1','GQstq','fontSize','dimColor1','iconIndex','ItemCraftingNumberWindow','isEnabled','ToolTips','getColor','description','_categoryWindow','IngredientBridge','_allCraftableItems','getItemCraftedTimes','eZVhG','itemCrafting','bind','Window_ShopStatus_setItem','AnySw','_buttons','updateItemSpriteOpacity','_animationWait','match','isTriggered','gainItem','helpAreaTop','_itemSprite','AllSwitches','_numberWindow','addChild','_data','goldWindowRectItemsEquipsCore','isItemCraftingCommandEnabled','allCraftableArmors','EdggI','Owned','drawCraftingIngredients','_buttonAssistWindow','categoryWindowRect','ZkhcV','updateCraftingAnimation','updateHelp','itemLineRect','opacity','setItemSpriteOpacity','toLowerCase','FjaMb','GoldWindow_RectJS','itemWindowRectJS','iconWidth','tLsJB','playItemCrafting','_allCraftableArmors','Item','hitIndex','createItemWindow','_text','STR','ItemsEquipsCore','setTooltipWindowText','ParseWeaponNotetags','BypassMasks','onItemCancel','statusWindowRectItemsEquipsCore','drawIngredients','createAnimationIDs','enabled','min','VisuMZ_0_CoreEngine','registerCraftedItem','statusWindowRectJS','owned','textColor','\x20=\x20','fontItalic','buttonAssistCategory','MDzrW','vSDuH','drawCurrencyValue','BRZMg','visible','buttonAssistLargeIncrement','createContents','_item','createNumberWindow','756853hgEiHL','yYPcd','#%1','Window_ItemCategory_needsSelection','YVZrL','helpWindowRectItemsEquipsCore','applyInverse','getBackgroundOpacity','ZZPzK','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','drawItemBackground','jsGlobalCraftEffect','parameters','activate','blt','drawIngredientItem','itemAt','findExt','CraftAssistButton','category:\x20%1','itemHeight','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','VisuMZ_1_ItemsEquipsCore','drawItemName','isReleased','setClickHandler','CategoryWindow_RectJS','CoreEngine','drawGoldIngredient','create','_maxIngredientsSize','PaCKC','_ingredientsList','MwKdM','YZPjy','Cgcmb','NBmQS','HjbtF','value','isSkill','showBatchContents','smoothSelect','call','9gVVJdq','getProxyItem','destroy','note','includes','allOfCraftBatchItemsMax','onItemCrafted','NumWindowNet','makeFontBigger','processItemCrafting','%1%2','contents','BgFilename2','Items','10156972yqIIHg','createCraftingIngredientsLists','opacitySpeed','MaskText','OffSwitches','isCraftingItemMasked','NxjPc','auemM','length','Ingredients','kXWjR','JSON','WXZSp','gradientFillRect','join','mAnbx','getCustomItemCraftingSettings','_bypassProxy','_ingredientSelectList','contains','needsSelection','buttonAssistText4','pTrMG','height','buttonAssistKey1','xpyfx','HelpWindow_RectJS','_ingredientSelectTitle','Window_ItemCategory_makeCommandList','_clickHandler','innerHeight','totalPriceY','mainCommandWidth','_max','index','soxiI','_itemWindow','createIngredientSelectionTitle','ARRAYSTRUCT','drawCategories','processFinishAnimation','BiwZb','helpWindowRectJS','ItemQuantityFmt','setCustomItemCraftingSettings','kgrCA','QIHfK','weapons','log','ARRAYEVAL','Name','setupNumberWindow','_goldWindow','fittingHeight','quantityFontSize','createUncategorizedItemCategory','_tooltipWindow','setItemSpriteBitmap','craftableArmors','addItemCraftingCommand','string','\x5cI[%1]%2','createTooltipWindow','_craftingIngredients','mainAreaTop','setItemSpritePosition','return\x200','destroyAnimationSprite','drawItemIngredient','addWindow','OIjgp','fillRect','EFJKO','drawIngredientCategory','filter','drawTextEx','onIngredientListOk','_armorIDs','allCraftableWeapons','initItemCraftingSys','_categoryIndex','EVAL','getCraftBatchItems','HcPhF','UXZue','_category','resetCraftingSwitches','drawCraftingItemName','BgSettings','getInputMultiButtonStrings','rPQUP','setHelpWindowItem','_lastCraftingExt','jsOnCraft','Armors','trim','GoldBgType','Game_Party_gainItem','_alreadySelected','XQWKn','selectedIngredientList','IconSet','textWidth','KbvvH','wpBjh','loadWindowskin','item','frames','isPlaytest','jsGlobalListing','Game_System_initialize','setItemSpriteFrame','drawBigItemIcon','popScene','VisuMZ_1_MainMenuCore','AGIxb','setItemWindow','setText','drawFadedItemBackground','push','itemCraftedIcon','LwMyO','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','MaskLetter','cancel','MmidU','dimColor2','createItemWindowBase','General','SnapshotOpacity','wyzCt','gainCraftBatchItems','createAnimation','ListBgType','JliBx','anchor','739650UQrHsj','fXJek','itemWindowRect','imageSmoothingEnabled','_animationPlaying','_iconSprite','processCraftCommonEvent','_cache_getCraftBatchItems','_itemsCrafted','_weaponIDs','number','floor','_animationSprite','drawPicture','_nonCategoryItemCraftingItems','setHandler','HeMjR','Eoion','test','drawIngredientGold','exit','ReqQuantityFontSize','contentsBack','prototype','Scale','WarningMsg','Game_Party_numItems','7464492Jxxsas','CraftEventOnce','AXuGh','addLoadListener','createCustomBackgroundImages','ParseAllNotetags','visualGoldDisplayAutosize','SystemEnableItemCraftingMenu','createBackground','_itemSpriteOpacitySpeed','onCategoryOk','startAnimation','helpAreaHeight','changePaintOpacity','drawText','_scene','setBackgroundType','center','_ItemCrafting_MainMenu','craftableItems','YrBIT','_craftPicture','isItem','_list','getArmorIdWithName','innerWidth','net','drawItem','commandItemCrafting','CraftedIcon','changeOkButtonEnable','\x20%1','clear','buttonAssistSmallIncrement','itemRectWithPadding','category','resetFontSettings','activateItemWindow','enableCraftingSwitches','rEafY','isTouchedInsideFrame','getWeaponIdWithName','_ingredientIndex','StatusBgType','EgvbL','Weapon','active','remove','ARRAYFUNC','uxbsj','YgeAv','createCraftingItemKey','allowCreateStatusWindow','Scene_Boot_onDatabaseLoaded','getCraftingIngredients','gRBaO','TPwLC','zZKSX'];_0x20b1=function(){return _0x4be28e;};return _0x20b1();}VisuMZ[_0x4ff796(0x367)]['WarningMsg']=_0x4ff796(0x33a),PluginManager[_0x4ff796(0x3ce)](pluginData[_0x4ff796(0x33d)],_0x4ff796(0x39e),_0x40e674=>{const _0x424040=_0x4ff796;if(SceneManager[_0x424040(0x433)]())return;if(SceneManager[_0x424040(0x441)]())return;if($gameSystem[_0x424040(0x45b)])return;if(DataManager[_0x424040(0x42a)]()[_0x424040(0x25e)]<=0x0){$gameTemp[_0x424040(0x2c2)]()&&alert(VisuMZ[_0x424040(0x367)][_0x424040(0x2f7)]);return;}SceneManager[_0x424040(0x2cd)](Scene_ItemCrafting);}),PluginManager[_0x4ff796(0x3ce)](pluginData[_0x4ff796(0x33d)],'CustomItemCraftingSceneOpen',_0x526b86=>{const _0x27298e=_0x4ff796;if(SceneManager[_0x27298e(0x433)]())return;if(SceneManager[_0x27298e(0x441)]())return;if($gameSystem[_0x27298e(0x45b)])return;VisuMZ[_0x27298e(0x462)](_0x526b86,_0x526b86);const _0x554fa6={'items':_0x526b86[_0x27298e(0x255)][_0x27298e(0x43a)](_0x483ffd=>$dataItems[_0x483ffd])['filter'](_0x105c52=>DataManager[_0x27298e(0x439)]()[_0x27298e(0x24c)](_0x105c52)),'weapons':_0x526b86['Weapons'][_0x27298e(0x43a)](_0x696e2d=>$dataWeapons[_0x696e2d])[_0x27298e(0x2a0)](_0x308da4=>DataManager[_0x27298e(0x2a4)]()[_0x27298e(0x24c)](_0x308da4)),'armors':_0x526b86[_0x27298e(0x2b4)][_0x27298e(0x43a)](_0x43ce8c=>$dataArmors[_0x43ce8c])[_0x27298e(0x2a0)](_0x4fe3f5=>DataManager['allCraftableArmors']()[_0x27298e(0x24c)](_0x4fe3f5)),'BypassSwitches':_0x526b86['BypassSwitches'],'BypassMasks':_0x526b86[_0x27298e(0x205)]};_0x554fa6['all']=_0x554fa6[_0x27298e(0x351)][_0x27298e(0x3bc)](_0x554fa6[_0x27298e(0x285)],_0x554fa6[_0x27298e(0x341)]);if(_0x554fa6['all'][_0x27298e(0x25e)]<=0x0){if(_0x27298e(0x36f)==='VBiCk'){$gameTemp['isPlaytest']()&&alert(VisuMZ[_0x27298e(0x367)][_0x27298e(0x2f7)]);return;}else{if(!_0xe4b988[_0x27298e(0x243)](_0x489772))return![];}}$gameTemp['setCustomItemCraftingSettings'](_0x554fa6),SceneManager[_0x27298e(0x2cd)](Scene_ItemCrafting);}),PluginManager[_0x4ff796(0x3ce)](pluginData['name'],_0x4ff796(0x340),_0x548f4f=>{const _0x1ff854=_0x4ff796;if(!SceneManager['isSceneMap']())return;if(!$gameSystem['_craftingCommonEventScene'])return;$gameSystem[_0x1ff854(0x45b)]=undefined,SceneManager[_0x1ff854(0x2cd)](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData[_0x4ff796(0x33d)],_0x4ff796(0x300),_0x53496a=>{const _0x1c93fb=_0x4ff796;VisuMZ[_0x1c93fb(0x462)](_0x53496a,_0x53496a),$gameSystem[_0x1c93fb(0x44e)](_0x53496a[_0x1c93fb(0x3a2)]);}),PluginManager[_0x4ff796(0x3ce)](pluginData[_0x4ff796(0x33d)],'SystemShowItemCraftingMenu',_0x266970=>{const _0x3d9323=_0x4ff796;VisuMZ['ConvertParams'](_0x266970,_0x266970),$gameSystem[_0x3d9323(0x3c0)](_0x266970[_0x3d9323(0x44b)]);}),VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x37a)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'CraftEventOnce':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftEventRepeat':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT):[ ](\d+)>/i,'CraftOnceAllSw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftOnceAnySw':/<(?:ONCE|ONE TIME|ONE-TIME)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftRepeatAllSw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:SWITCH|SWITCHES|ALL SWITCHES):[ ](.*)>/i,'CraftRepeatAnySw':/<(?:REPEAT|REPEATING|RECURRING)[ ]CRAFT[ ](?:EVENT|COMMON EVENT)[ ](?:ANY SWITCH|ANY SWITCHES):[ ](.*)>/i,'CraftBatchWrap':/<CRAFT BATCH>\s*([\s\S]*)\s*<\/CRAFT BATCH>/i},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x32e)]=Scene_Boot[_0x4ff796(0x2f5)]['onDatabaseLoaded'],Scene_Boot[_0x4ff796(0x2f5)][_0x4ff796(0x335)]=function(){const _0x304e35=_0x4ff796;VisuMZ[_0x304e35(0x367)][_0x304e35(0x32e)]['call'](this),this[_0x304e35(0x465)]();},Scene_Boot[_0x4ff796(0x2f5)][_0x4ff796(0x465)]=function(){const _0x59192b=_0x4ff796;this[_0x59192b(0x232)]();},Scene_Boot[_0x4ff796(0x2f5)]['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']=function(){const _0x4429a6=_0x4ff796;if(VisuMZ[_0x4429a6(0x2fe)])return;const _0x52ff4b=$dataItems[_0x4429a6(0x3bc)]($dataWeapons,$dataArmors);for(const _0xebcee3 of _0x52ff4b){if(_0x4429a6(0x29e)!==_0x4429a6(0x2be)){if(!_0xebcee3)continue;VisuMZ[_0x4429a6(0x367)][_0x4429a6(0x463)](_0xebcee3);}else{if(this[_0x4429a6(0x323)]>=this[_0x4429a6(0x399)][_0x4429a6(0x25e)])return this[_0x4429a6(0x289)]();this[_0x4429a6(0x480)][_0x4429a6(0x453)](),this[_0x4429a6(0x1e4)][_0x4429a6(0x453)]();const _0x21d32d=this['_ingredientCategories'][this['_ingredientIndex']],_0x386e72=this[_0x4429a6(0x3f9)][this[_0x4429a6(0x323)]];this[_0x4429a6(0x271)][_0x4429a6(0x342)](),this[_0x4429a6(0x268)][_0x4429a6(0x342)](),this[_0x4429a6(0x271)]['contents'][_0x4429a6(0x319)]();const _0xcd8a48=_0x501f72[_0x4429a6(0x367)]['Settings'][_0x4429a6(0x2d6)][_0x4429a6(0x410)],_0x57bbd0=_0x24504e[_0x4429a6(0x202)]['Settings'][_0x4429a6(0x349)][_0x4429a6(0x281)],_0x28fc86=_0xcd8a48[_0x4429a6(0x3d7)](_0x21d32d,_0x57bbd0[_0x4429a6(0x3d7)](_0x386e72)),_0x12ddda=this[_0x4429a6(0x271)][_0x4429a6(0x1f2)](0x0);this[_0x4429a6(0x271)]['drawTextEx'](_0x28fc86,_0x12ddda['x'],_0x12ddda['y']),this[_0x4429a6(0x268)]['setup'](_0x21d32d,_0x386e72);}}},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x37e)]=VisuMZ[_0x4ff796(0x37e)],VisuMZ[_0x4ff796(0x37e)]=function(_0x1cff0f){const _0x1d237c=_0x4ff796;VisuMZ[_0x1d237c(0x367)][_0x1d237c(0x37e)][_0x1d237c(0x247)](this,_0x1cff0f),VisuMZ[_0x1d237c(0x367)][_0x1d237c(0x463)](_0x1cff0f);},VisuMZ['ItemCraftingSys'][_0x4ff796(0x204)]=VisuMZ[_0x4ff796(0x204)],VisuMZ['ParseWeaponNotetags']=function(_0x4008b6){const _0x1492a8=_0x4ff796;VisuMZ[_0x1492a8(0x367)][_0x1492a8(0x204)]['call'](this,_0x4008b6),VisuMZ[_0x1492a8(0x367)][_0x1492a8(0x463)](_0x4008b6);},VisuMZ[_0x4ff796(0x367)]['ParseArmorNotetags']=VisuMZ[_0x4ff796(0x40b)],VisuMZ['ParseArmorNotetags']=function(_0x3ac8d1){const _0x3705eb=_0x4ff796;VisuMZ['ItemCraftingSys']['ParseArmorNotetags'][_0x3705eb(0x247)](this,_0x3ac8d1),VisuMZ[_0x3705eb(0x367)][_0x3705eb(0x463)](_0x3ac8d1);},VisuMZ['ItemCraftingSys']['Parse_Notetags_CreateJS']=function(_0x1702ea){const _0x2438b2=_0x4ff796;_0x1702ea['note']['match'](VisuMZ['ItemCraftingSys']['RegExp'][_0x2438b2(0x2b3)])&&VisuMZ[_0x2438b2(0x367)][_0x2438b2(0x3f3)](_0x1702ea,RegExp['$1']);},VisuMZ[_0x4ff796(0x367)]['JS']={},VisuMZ[_0x4ff796(0x367)]['createJS']=function(_0xa7ccbb,_0x2c635f){const _0x1c6c7a=_0x4ff796,_0x13d397=_0x1c6c7a(0x226)[_0x1c6c7a(0x3d7)](_0x2c635f),_0x101e6b=DataManager[_0x1c6c7a(0x32c)](_0xa7ccbb);VisuMZ[_0x1c6c7a(0x367)]['JS'][_0x101e6b]=new Function(_0x13d397);},DataManager['isCraftItemListed']=function(_0x229d4d){const _0x20dd1a=_0x4ff796;if(!_0x229d4d)return![];if(DataManager[_0x20dd1a(0x32f)](_0x229d4d)[_0x20dd1a(0x25e)]<=0x0)return![];if(_0x229d4d['note'][_0x20dd1a(0x48c)](VisuMZ[_0x20dd1a(0x367)]['RegExp'][_0x20dd1a(0x461)])){if(!$gameTemp[_0x20dd1a(0x266)]())return![];}if(!VisuMZ['ItemCraftingSys'][_0x20dd1a(0x454)][_0x20dd1a(0x2d6)][_0x20dd1a(0x2c3)]['call'](this,_0x229d4d))return![];if(!VisuMZ[_0x20dd1a(0x367)]['CheckAllSwitches'](_0x229d4d))return![];if(!VisuMZ['ItemCraftingSys'][_0x20dd1a(0x36c)](_0x229d4d))return![];return!![];},VisuMZ['ItemCraftingSys']['CheckAllSwitches']=function(_0x4ec78f){const _0x215dbd=_0x4ff796,_0x4464f2=$gameTemp[_0x215dbd(0x266)]();if(_0x4464f2&&_0x4464f2['BypassSwitches'])return!![];const _0x2f8601=VisuMZ['ItemCraftingSys'][_0x215dbd(0x37a)][_0x215dbd(0x1e3)],_0x25ec0e=_0x4ec78f['note'][_0x215dbd(0x48c)](_0x2f8601);if(_0x25ec0e){if('BiwZb'===_0x215dbd(0x27f))for(const _0x19a5f4 of _0x25ec0e){if(!_0x19a5f4)continue;_0x19a5f4[_0x215dbd(0x48c)](_0x2f8601);const _0x32571d=JSON[_0x215dbd(0x35a)]('['+RegExp['$1'][_0x215dbd(0x48c)](/\d+/g)+']');for(const _0x132731 of _0x32571d){if(_0x215dbd(0x3b5)===_0x215dbd(0x2b9))this['_allCraftableArmors'][_0x215dbd(0x2cd)](_0x495549);else{if(!$gameSwitches[_0x215dbd(0x243)](_0x132731))return![];}}}else _0x25fd3f[_0x215dbd(0x2cd)](_0x353b0d);}return!![];},VisuMZ['ItemCraftingSys'][_0x4ff796(0x36c)]=function(_0x2e11f6){const _0x269df7=_0x4ff796,_0x1748e5=$gameTemp[_0x269df7(0x266)]();if(_0x1748e5&&_0x1748e5[_0x269df7(0x386)])return!![];const _0x529b21=VisuMZ[_0x269df7(0x367)][_0x269df7(0x37a)][_0x269df7(0x372)],_0x21c78=_0x2e11f6[_0x269df7(0x24b)][_0x269df7(0x48c)](_0x529b21);if(_0x21c78){for(const _0x5384a3 of _0x21c78){if(!_0x5384a3)continue;_0x5384a3[_0x269df7(0x48c)](_0x529b21);const _0x319082=JSON[_0x269df7(0x35a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x51e7d2 of _0x319082){if(_0x269df7(0x33e)==='lXiAT'){if($gameSwitches[_0x269df7(0x243)](_0x51e7d2))return!![];}else{const _0x2beb24=this[_0x269df7(0x3b8)]();let _0x47c130=_0x2beb24*0x2;const _0x40572b=this[_0x269df7(0x312)]-_0x47c130-_0x2beb24*0x3,_0x220fcd=_0x47c130+_0x92328f[_0x269df7(0x473)](_0x40572b/0x3),_0xdda6f4=this[_0x269df7(0x3d8)](),_0x6730cb=_0x58c79b[_0x269df7(0x2e9)](_0x40572b*0x2/0x3/0x3),_0x5e9578=_0x29b09a['max'](this['textWidth']('\x20+\x20'),this[_0x269df7(0x2bc)](_0x269df7(0x211))),_0x3f9364=this[_0x269df7(0x21b)]?.[_0x269df7(0x47a)]>0x0?_0x44381e[_0x269df7(0x1f9)]:0x0,_0x2e22b5=this['cursorWidth'](),_0x153708=new _0x35e5a8(_0x18be82['floor'](_0x220fcd+_0x6730cb*0x2-this[_0x269df7(0x467)]()-_0x3f9364+this[_0x269df7(0x3b8)]()/0x2-0x2),_0xdda6f4,this['cursorWidth'](),this[_0x269df7(0x39a)]());return _0x153708;}}}return![];}return!![];},DataManager['currentCraftableItems']=function(){const _0x22d551=_0x4ff796,_0x192caf=$gameTemp[_0x22d551(0x266)]();if(_0x192caf)return _0x192caf[_0x22d551(0x474)][_0x22d551(0x2a0)](_0x49f310=>this[_0x22d551(0x3ba)](_0x49f310));const _0x3c25d4=this[_0x22d551(0x30c)](),_0x3fdd2a=this['craftableWeapons'](),_0x4dd52e=this[_0x22d551(0x290)]();return _0x3c25d4[_0x22d551(0x3bc)](_0x3fdd2a,_0x4dd52e);},DataManager[_0x4ff796(0x30c)]=function(){const _0x534dcc=_0x4ff796;return this[_0x534dcc(0x439)]()[_0x534dcc(0x2a0)](_0x21c0ea=>this[_0x534dcc(0x3ba)](_0x21c0ea));},DataManager[_0x4ff796(0x439)]=function(){const _0x2121b8=_0x4ff796;if(this[_0x2121b8(0x482)]!==undefined)return this['_allCraftableItems'];this[_0x2121b8(0x482)]=[];for(const _0x4bfc72 of $dataItems){if(!_0x4bfc72)continue;_0x4bfc72[_0x2121b8(0x24b)][_0x2121b8(0x48c)](VisuMZ[_0x2121b8(0x367)][_0x2121b8(0x37a)][_0x2121b8(0x25f)])&&this['_allCraftableItems']['push'](_0x4bfc72);}return this[_0x2121b8(0x482)];},DataManager[_0x4ff796(0x36a)]=function(){const _0x5edba8=_0x4ff796;return this['allCraftableWeapons']()[_0x5edba8(0x2a0)](_0x3d51e8=>this[_0x5edba8(0x3ba)](_0x3d51e8));},DataManager[_0x4ff796(0x2a4)]=function(){const _0xf8f81b=_0x4ff796;if(this[_0xf8f81b(0x3e2)]!==undefined)return this[_0xf8f81b(0x3e2)];this['_allCraftableWeapons']=[];for(const _0x4b3ba4 of $dataWeapons){if(!_0x4b3ba4)continue;_0x4b3ba4[_0xf8f81b(0x24b)]['match'](VisuMZ[_0xf8f81b(0x367)][_0xf8f81b(0x37a)][_0xf8f81b(0x25f)])&&this[_0xf8f81b(0x3e2)][_0xf8f81b(0x2cd)](_0x4b3ba4);}return this['_allCraftableWeapons'];},DataManager[_0x4ff796(0x290)]=function(){const _0x25988d=_0x4ff796;return this['allCraftableArmors']()[_0x25988d(0x2a0)](_0xda8027=>this[_0x25988d(0x3ba)](_0xda8027));},DataManager[_0x4ff796(0x1e9)]=function(){const _0x1eb857=_0x4ff796;if(this[_0x1eb857(0x1fc)]!==undefined)return this['_allCraftableArmors'];this['_allCraftableArmors']=[];for(const _0x59d6cb of $dataArmors){if(!_0x59d6cb)continue;_0x59d6cb['note'][_0x1eb857(0x48c)](VisuMZ[_0x1eb857(0x367)][_0x1eb857(0x37a)][_0x1eb857(0x25f)])&&this[_0x1eb857(0x1fc)][_0x1eb857(0x2cd)](_0x59d6cb);}return this['_allCraftableArmors'];},DataManager[_0x4ff796(0x32f)]=function(_0x3c6a67){const _0x19e9f5=_0x4ff796;if(!_0x3c6a67)return[];const _0x449777=this['createCraftingItemKey'](_0x3c6a67);return this['_craftingIngredients']===undefined&&(_0x19e9f5(0x225)===_0x19e9f5(0x444)?this[_0x19e9f5(0x3de)](_0xbe5f3b):this[_0x19e9f5(0x257)]()),this['_craftingIngredients'][_0x449777]||[];},DataManager[_0x4ff796(0x32c)]=function(_0x36e982){const _0x15c23c=_0x4ff796;let _0x45493d=_0x15c23c(0x252);if(this[_0x15c23c(0x30f)](_0x36e982))return _0x45493d[_0x15c23c(0x3d7)](_0x15c23c(0x1fd),_0x36e982['id']);if(this[_0x15c23c(0x464)](_0x36e982))return _0x45493d[_0x15c23c(0x3d7)](_0x15c23c(0x326),_0x36e982['id']);if(this[_0x15c23c(0x438)](_0x36e982))return _0x45493d['format']('Armor',_0x36e982['id']);return'';},DataManager[_0x4ff796(0x257)]=function(){const _0x564562=_0x4ff796;this[_0x564562(0x295)]={};const _0x4538ad=$dataItems['concat']($dataWeapons,$dataArmors);for(const _0x43f98c of _0x4538ad){if(!_0x43f98c)continue;if(_0x43f98c['note'][_0x564562(0x48c)](VisuMZ[_0x564562(0x367)][_0x564562(0x37a)][_0x564562(0x25f)])){const _0x3c0bcb=String(RegExp['$1'])[_0x564562(0x41e)](/[\r\n]+/),_0x10ba71=this[_0x564562(0x3e6)](_0x43f98c,_0x3c0bcb);if(_0x10ba71[_0x564562(0x25e)]<=0x0)continue;const _0x5013fd=this['createCraftingItemKey'](_0x43f98c);this[_0x564562(0x295)][_0x5013fd]=_0x10ba71;}}},DataManager[_0x4ff796(0x3e6)]=function(_0x3a9126,_0x36466f){const _0x4b622a=_0x4ff796;let _0x4b4759=[];for(let _0x2105c3 of _0x36466f){_0x2105c3=_0x2105c3[_0x4b622a(0x2b5)]();if(_0x2105c3['match'](/GOLD:[ ](\d+)/i))_0x4b4759[_0x4b622a(0x2cd)](['gold',Number(RegExp['$1'])]);else{if(_0x2105c3[_0x4b622a(0x48c)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x47aa81=String(RegExp['$1'])[_0x4b622a(0x2b5)](),_0x19096f=Number(RegExp['$2'])||0x1,_0x347ce5=_0x4b622a(0x230)['format'](_0x47aa81);_0x4b4759[_0x4b622a(0x2cd)]([_0x347ce5,_0x19096f]);}else{if(_0x2105c3[_0x4b622a(0x48c)](/(.*?)[ ](\d+):[ ](\d+)/i)){if(_0x4b622a(0x332)===_0x4b622a(0x3e0))_0x502647=_0x4be046[_0x4b622a(0x367)][_0x4b622a(0x3f7)](_0x101418),this[_0x4b622a(0x253)][_0x4b622a(0x212)]=_0x663bff[_0x4b622a(0x3e8)];else{const _0x4a1fe6=RegExp['$1'][_0x4b622a(0x1f5)]()[_0x4b622a(0x2b5)](),_0x2c8292=Number(RegExp['$2'])||0x0,_0x181fff=Number(RegExp['$3'])||0x1;let _0x46fc1e=null;if(['item',_0x4b622a(0x351)][_0x4b622a(0x24c)](_0x4a1fe6))_0x46fc1e=$dataItems;if(['weapon',_0x4b622a(0x285)][_0x4b622a(0x24c)](_0x4a1fe6))_0x46fc1e=$dataWeapons;if(['armor',_0x4b622a(0x341)][_0x4b622a(0x24c)](_0x4a1fe6))_0x46fc1e=$dataArmors;this[_0x4b622a(0x39b)](_0x3a9126,_0x46fc1e,_0x2c8292,_0x4b4759)&&_0x4b4759[_0x4b622a(0x2cd)]([_0x46fc1e[_0x2c8292],_0x181fff]);}}else{if(_0x2105c3[_0x4b622a(0x48c)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x23e2fd=RegExp['$1'][_0x4b622a(0x1f5)]()[_0x4b622a(0x2b5)](),_0x1af4a2=RegExp['$2'][_0x4b622a(0x2b5)](),_0x128a44=Number(RegExp['$3'])||0x1;let _0x17384d=null,_0x2a0f67=0x0;['item',_0x4b622a(0x351)][_0x4b622a(0x24c)](_0x23e2fd)&&(_0x17384d=$dataItems,_0x2a0f67=this[_0x4b622a(0x42c)](_0x1af4a2)),[_0x4b622a(0x3db),_0x4b622a(0x285)][_0x4b622a(0x24c)](_0x23e2fd)&&('acCEM'===_0x4b622a(0x3c7)?this['_customItemCraftingSettings']=_0x4335c9:(_0x17384d=$dataWeapons,_0x2a0f67=this[_0x4b622a(0x322)](_0x1af4a2))),[_0x4b622a(0x3ac),_0x4b622a(0x341)][_0x4b622a(0x24c)](_0x23e2fd)&&(_0x17384d=$dataArmors,_0x2a0f67=this[_0x4b622a(0x311)](_0x1af4a2)),this[_0x4b622a(0x39b)](_0x3a9126,_0x17384d,_0x2a0f67,_0x4b4759)&&_0x4b4759[_0x4b622a(0x2cd)]([_0x17384d[_0x2a0f67],_0x128a44]);}}}}}return _0x4b4759;},DataManager[_0x4ff796(0x39b)]=function(_0x42791b,_0x285d24,_0x19992a,_0x392dfa){const _0x4f0096=_0x4ff796;if(!_0x285d24)return![];if(!_0x285d24[_0x19992a])return![];const _0x11dd1b=_0x285d24[_0x19992a];if(_0x11dd1b===_0x42791b)return![];for(const _0x19f119 of _0x392dfa){if(_0x4f0096(0x34b)===_0x4f0096(0x34b)){if(!_0x19f119)continue;if(_0x19f119[0x0]===_0x11dd1b)return![];}else this['_alreadySelected']=!![];}return!![];},DataManager[_0x4ff796(0x42c)]=function(_0x7643e8){const _0x2a907e=_0x4ff796;_0x7643e8=_0x7643e8[_0x2a907e(0x35b)]()[_0x2a907e(0x2b5)](),this[_0x2a907e(0x355)]=this[_0x2a907e(0x355)]||{};if(this[_0x2a907e(0x355)][_0x7643e8])return this['_itemIDs'][_0x7643e8];for(const _0x39c7fe of $dataItems){if(!_0x39c7fe)continue;this[_0x2a907e(0x355)][_0x39c7fe['name']['toUpperCase']()[_0x2a907e(0x2b5)]()]=_0x39c7fe['id'];}return this[_0x2a907e(0x355)][_0x7643e8]||0x0;},DataManager[_0x4ff796(0x322)]=function(_0xa4144f){const _0x50779b=_0x4ff796;_0xa4144f=_0xa4144f['toUpperCase']()[_0x50779b(0x2b5)](),this[_0x50779b(0x2e7)]=this[_0x50779b(0x2e7)]||{};if(this[_0x50779b(0x2e7)][_0xa4144f])return this[_0x50779b(0x2e7)][_0xa4144f];for(const _0x182094 of $dataWeapons){if(_0x50779b(0x357)!==_0x50779b(0x357))_0x4e567c['prototype']['createBackground'][_0x50779b(0x247)](this),this[_0x50779b(0x423)](this[_0x50779b(0x224)]()),this[_0x50779b(0x2fd)]();else{if(!_0x182094)continue;this['_weaponIDs'][_0x182094[_0x50779b(0x33d)][_0x50779b(0x35b)]()[_0x50779b(0x2b5)]()]=_0x182094['id'];}}return this[_0x50779b(0x2e7)][_0xa4144f]||0x0;},DataManager[_0x4ff796(0x311)]=function(_0xf67448){const _0x7e72db=_0x4ff796;_0xf67448=_0xf67448[_0x7e72db(0x35b)]()[_0x7e72db(0x2b5)](),this['_armorIDs']=this['_armorIDs']||{};if(this[_0x7e72db(0x2a3)][_0xf67448])return this[_0x7e72db(0x2a3)][_0xf67448];for(const _0x225ba1 of $dataArmors){if(_0x7e72db(0x360)===_0x7e72db(0x360)){if(!_0x225ba1)continue;this[_0x7e72db(0x2a3)][_0x225ba1[_0x7e72db(0x33d)][_0x7e72db(0x35b)]()[_0x7e72db(0x2b5)]()]=_0x225ba1['id'];}else{let _0x1cb074=_0xb2b923[0x0];this[_0x7e72db(0x31d)](),this[_0x7e72db(0x35c)](_0x54c9bb,'-'),_0x1cb074===_0x7e72db(0x3aa)?this[_0x7e72db(0x239)](_0x56853f,_0x2e1bda,!![]):this[_0x7e72db(0x29a)](_0x4b9130,_0x48ee81,!![],![]);}}return this[_0x7e72db(0x2a3)][_0xf67448]||0x0;},DataManager[_0x4ff796(0x25b)]=function(_0x2834de){const _0x56f3b5=_0x4ff796;if(!_0x2834de)return![];if(DataManager[_0x56f3b5(0x3fb)](_0x2834de))return![];if(!VisuMZ[_0x56f3b5(0x367)][_0x56f3b5(0x454)][_0x56f3b5(0x432)][_0x56f3b5(0x3a2)])return![];DataManager[_0x56f3b5(0x249)]&&(_0x2834de=DataManager[_0x56f3b5(0x249)](_0x2834de));const _0x30ca41=$gameTemp[_0x56f3b5(0x266)]();if(_0x30ca41&&_0x30ca41['BypassMasks'])return![];if(_0x2834de[_0x56f3b5(0x24b)][_0x56f3b5(0x48c)](VisuMZ[_0x56f3b5(0x367)][_0x56f3b5(0x37a)]['NoMask']))return![];return!$gameSystem[_0x56f3b5(0x3fd)](_0x2834de);},DataManager['hasCraftBatchItems']=function(_0x190558){const _0x334a74=_0x4ff796;if(!Imported[_0x334a74(0x46c)])return![];return this[_0x334a74(0x2a8)](_0x190558)!==null;},DataManager[_0x4ff796(0x2a8)]=function(_0x13743b){const _0x527ad6=_0x4ff796;if(!_0x13743b)return null;if(this[_0x527ad6(0x244)](_0x13743b))return null;if(this[_0x527ad6(0x3e9)](_0x13743b))return null;if(!Imported[_0x527ad6(0x46c)])return null;let _0x5c8508='';if(DataManager[_0x527ad6(0x30f)](_0x13743b)){if(_0x527ad6(0x3bf)===_0x527ad6(0x3bf))_0x5c8508=_0x527ad6(0x3e4)[_0x527ad6(0x3d7)](_0x13743b['id']);else return _0x4c2d13[_0x527ad6(0x2e9)](this[_0x527ad6(0x275)]()+this['lineHeight']()*0x2);}else{if(DataManager['isWeapon'](_0x13743b)){if(_0x527ad6(0x1ea)===_0x527ad6(0x430)){const _0x4715f8=this['itemWindowRect']();this[_0x527ad6(0x27a)]=new _0x34e502(_0x4715f8),this[_0x527ad6(0x27a)][_0x527ad6(0x469)](this[_0x527ad6(0x3c4)]),this[_0x527ad6(0x27a)][_0x527ad6(0x2ed)]('ok',this[_0x527ad6(0x3a3)][_0x527ad6(0x486)](this)),this[_0x527ad6(0x27a)][_0x527ad6(0x2ed)]('cancel',this[_0x527ad6(0x206)][_0x527ad6(0x486)](this)),this[_0x527ad6(0x29b)](this[_0x527ad6(0x27a)]),this[_0x527ad6(0x480)]['setItemWindow'](this[_0x527ad6(0x27a)]),!this[_0x527ad6(0x480)][_0x527ad6(0x26a)]()&&(this['_itemWindow']['y']-=this[_0x527ad6(0x480)][_0x527ad6(0x26d)],this[_0x527ad6(0x27a)]['height']+=this['_categoryWindow'][_0x527ad6(0x26d)],this[_0x527ad6(0x480)]['hide'](),this[_0x527ad6(0x480)][_0x527ad6(0x34d)](),this[_0x527ad6(0x303)]());}else _0x5c8508='weapon-%1'['format'](_0x13743b['id']);}else{if(DataManager[_0x527ad6(0x438)](_0x13743b))_0x5c8508=_0x527ad6(0x363)['format'](_0x13743b['id']);else{if('yYPcd'===_0x527ad6(0x21e))return null;else _0x463126['setValue'](_0x25111d,_0x41bd80);}}}DataManager['_cache_getCraftBatchItems']=DataManager[_0x527ad6(0x2e5)]||{};if(DataManager[_0x527ad6(0x2e5)][_0x5c8508]!==undefined)return _0x527ad6(0x2df)!==_0x527ad6(0x336)?DataManager['_cache_getCraftBatchItems'][_0x5c8508]:_0x2656e0[_0x527ad6(0x2f5)][_0x527ad6(0x36b)]['call'](this);let _0x458284=![],_0x7429f4={};const _0x121f4f=VisuMZ[_0x527ad6(0x367)][_0x527ad6(0x37a)],_0x5bd66e=_0x13743b['note']||'';if(_0x5bd66e[_0x527ad6(0x48c)](_0x121f4f[_0x527ad6(0x3c6)])){const _0x958b86=String(RegExp['$1'])[_0x527ad6(0x41e)](/[\r\n]+/)[_0x527ad6(0x328)]('');_0x7429f4={'items':{},'weapons':{},'armors':{}};for(const _0x4eed57 of _0x958b86){if(_0x4eed57[_0x527ad6(0x48c)](/ITEM[ ](.*):[ ](\d+)/i)){const _0x2c25d9=String(RegExp['$1']),_0x4c14c8=Math['max'](0x1,Number(RegExp['$2'])),_0x4a3a93=/^\d+$/['test'](_0x2c25d9),_0x3a1389=_0x4a3a93?_0x2c25d9:this[_0x527ad6(0x42c)](_0x2c25d9);_0x7429f4[_0x527ad6(0x351)][_0x3a1389]=_0x4c14c8,_0x458284=!![];}else{if(_0x4eed57[_0x527ad6(0x48c)](/ITEM[ ](.*)/i)){const _0x244052=String(RegExp['$1']),_0xdb022c=/^\d+$/['test'](_0x244052),_0x5c0a05=_0xdb022c?_0x244052:this[_0x527ad6(0x42c)](_0x244052);_0x7429f4[_0x527ad6(0x351)][_0x5c0a05]=0x1,_0x458284=!![];}}if(_0x4eed57[_0x527ad6(0x48c)](/WEAPON[ ](.*):[ ](\d+)/i)){if(_0x527ad6(0x403)!=='mqEUO'){if(_0x277b3f[_0x527ad6(0x367)][_0x527ad6(0x454)][_0x527ad6(0x380)][_0x527ad6(0x45d)])return _0x35ea7b[_0x527ad6(0x367)][_0x527ad6(0x454)][_0x527ad6(0x380)][_0x527ad6(0x45d)][_0x527ad6(0x247)](this);const _0x45e3d2=this[_0x527ad6(0x365)](),_0x21bf83=this[_0x527ad6(0x3ed)]()-this['_commandWindow'][_0x527ad6(0x26d)],_0x9d54af=this[_0x527ad6(0x337)]()?0x0:_0xc89e10[_0x527ad6(0x338)]-_0x45e3d2,_0x1d42ff=this[_0x527ad6(0x3eb)]['y']+this[_0x527ad6(0x3eb)][_0x527ad6(0x26d)];return new _0x159b4a(_0x9d54af,_0x1d42ff,_0x45e3d2,_0x21bf83);}else{const _0x45b98b=String(RegExp['$1']),_0x282036=Math[_0x527ad6(0x3dc)](0x1,Number(RegExp['$2'])),_0x3563ad=/^\d+$/['test'](_0x45b98b),_0x4a0269=_0x3563ad?_0x45b98b:this[_0x527ad6(0x322)](_0x45b98b);_0x7429f4[_0x527ad6(0x285)][_0x4a0269]=_0x282036,_0x458284=!![];}}else{if(_0x4eed57[_0x527ad6(0x48c)](/WEAPON[ ](.*)/i)){if(_0x527ad6(0x29c)!=='OIjgp')_0x20dd41[_0x527ad6(0x367)][_0x527ad6(0x204)][_0x527ad6(0x247)](this,_0x1658fd),_0x3f8676[_0x527ad6(0x367)]['Parse_Notetags_CreateJS'](_0x44c140);else{const _0x258d9e=String(RegExp['$1']),_0x8468a5=/^\d+$/[_0x527ad6(0x2f0)](_0x258d9e),_0x95b911=_0x8468a5?_0x258d9e:this[_0x527ad6(0x322)](_0x258d9e);_0x7429f4[_0x527ad6(0x285)][_0x95b911]=0x1,_0x458284=!![];}}}if(_0x4eed57[_0x527ad6(0x48c)](/ARMOR[ ](.*):[ ](\d+)/i)){const _0x135c96=String(RegExp['$1']),_0xb6cdfd=Math['max'](0x1,Number(RegExp['$2'])),_0x2df777=/^\d+$/[_0x527ad6(0x2f0)](_0x135c96),_0x4a1398=_0x2df777?_0x135c96:this[_0x527ad6(0x311)](_0x135c96);_0x7429f4[_0x527ad6(0x341)][_0x4a1398]=_0xb6cdfd,_0x458284=!![];}else{if(_0x4eed57['match'](/ARMOR[ ](.*)/i)){if(_0x527ad6(0x484)==='FoSHh'){const _0x16a91e=_0x40a212[_0x527ad6(0x266)]();if(_0x16a91e)return _0x16a91e[_0x527ad6(0x474)]['filter'](_0x2818e4=>this[_0x527ad6(0x3ba)](_0x2818e4));const _0xa31af5=this[_0x527ad6(0x30c)](),_0x4ec2f5=this[_0x527ad6(0x36a)](),_0x2aff96=this['craftableArmors']();return _0xa31af5['concat'](_0x4ec2f5,_0x2aff96);}else{const _0x43c8cb=String(RegExp['$1']),_0x50540b=/^\d+$/[_0x527ad6(0x2f0)](_0x43c8cb),_0x1ae7c7=_0x50540b?_0x43c8cb:this[_0x527ad6(0x311)](_0x43c8cb);_0x7429f4['armors'][_0x1ae7c7]=0x1,_0x458284=!![];}}}}}if(!_0x458284)_0x7429f4=null;return DataManager[_0x527ad6(0x2e5)][_0x5c8508]=_0x7429f4,DataManager[_0x527ad6(0x2e5)][_0x5c8508];},ImageManager[_0x4ff796(0x2ce)]=VisuMZ[_0x4ff796(0x367)]['Settings']['General'][_0x4ff796(0x316)],SoundManager['playItemCrafting']=function(_0xb0ca63){const _0x5b7afd=_0x4ff796;AudioManager[_0x5b7afd(0x3cb)](VisuMZ[_0x5b7afd(0x367)]['Settings'][_0x5b7afd(0x450)]);},TextManager[_0x4ff796(0x35d)]=VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)][_0x4ff796(0x2d6)][_0x4ff796(0x481)],TextManager[_0x4ff796(0x334)]=VisuMZ['ItemCraftingSys'][_0x4ff796(0x454)][_0x4ff796(0x2d6)][_0x4ff796(0x22f)],TextManager[_0x4ff796(0x3a5)]=VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)]['Mask'][_0x4ff796(0x2d1)],TextManager[_0x4ff796(0x361)]=VisuMZ[_0x4ff796(0x367)]['Settings'][_0x4ff796(0x419)][_0x4ff796(0x288)],TextManager[_0x4ff796(0x47b)]={'owned':VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)][_0x4ff796(0x2d6)][_0x4ff796(0x384)]||_0x4ff796(0x1eb),'shift':VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)]['General']['NumWindowShift']||'Change','net':VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)][_0x4ff796(0x2d6)][_0x4ff796(0x24f)]||_0x4ff796(0x3d0)},ColorManager[_0x4ff796(0x47e)]=function(_0xa60895){const _0x3929a8=_0x4ff796;_0xa60895=String(_0xa60895);if(_0xa60895['match'](/#(.*)/i)){if(_0x3929a8(0x25d)!=='auemM')this['drawGoldIngredient'](_0x571d85,_0x5baefb,!![]);else return _0x3929a8(0x21f)[_0x3929a8(0x3d7)](String(RegExp['$1']));}else return _0x3929a8(0x457)!=='Pklws'?this['textColor'](Number(_0xa60895)):_0x4710f1[_0x3929a8(0x2f5)][_0x3929a8(0x207)][_0x3929a8(0x247)](this);},SceneManager[_0x4ff796(0x433)]=function(){const _0x5f1bbb=_0x4ff796;return this[_0x5f1bbb(0x308)]&&this[_0x5f1bbb(0x308)][_0x5f1bbb(0x38a)]===Scene_Battle;},SceneManager[_0x4ff796(0x441)]=function(){const _0x335074=_0x4ff796;return this['_scene']&&this[_0x335074(0x308)][_0x335074(0x38a)]===Scene_ItemCrafting;},Game_Temp[_0x4ff796(0x2f5)]['getCustomItemCraftingSettings']=function(){const _0x26e5de=_0x4ff796;return this[_0x26e5de(0x3d2)];},Game_Temp[_0x4ff796(0x2f5)]['clearCustomItemCraftingSettings']=function(){this['_customItemCraftingSettings']=undefined;},Game_Temp[_0x4ff796(0x2f5)][_0x4ff796(0x282)]=function(_0x1a0591){const _0x158ae9=_0x4ff796;this[_0x158ae9(0x3d2)]=_0x1a0591;},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x2c4)]=Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x378)],Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x378)]=function(){const _0x1676ab=_0x4ff796;VisuMZ['ItemCraftingSys'][_0x1676ab(0x2c4)][_0x1676ab(0x247)](this),this[_0x1676ab(0x376)](),this[_0x1676ab(0x2a5)](),this['initItemCraftingEvents']();},Game_System[_0x4ff796(0x2f5)]['initItemCraftingMainMenu']=function(){const _0x4bdd0c=_0x4ff796;this[_0x4bdd0c(0x30b)]={'shown':VisuMZ[_0x4bdd0c(0x367)][_0x4bdd0c(0x454)][_0x4bdd0c(0x419)][_0x4bdd0c(0x394)],'enabled':VisuMZ[_0x4bdd0c(0x367)][_0x4bdd0c(0x454)][_0x4bdd0c(0x419)][_0x4bdd0c(0x3ab)]};},Game_System[_0x4ff796(0x2f5)]['isMainMenuItemCraftingVisible']=function(){const _0x49dce5=_0x4ff796;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x49dce5(0x376)]();return this[_0x49dce5(0x30b)][_0x49dce5(0x3e5)];},Game_System['prototype'][_0x4ff796(0x3c0)]=function(_0x4c8e0d){const _0x1a337b=_0x4ff796;if(this[_0x1a337b(0x30b)]===undefined)this[_0x1a337b(0x376)]();this[_0x1a337b(0x30b)]['shown']=_0x4c8e0d;},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x402)]=function(){const _0x6436f0=_0x4ff796;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x6436f0(0x376)]();return this[_0x6436f0(0x30b)][_0x6436f0(0x20a)];},Game_System['prototype'][_0x4ff796(0x44e)]=function(_0x5b7dea){const _0x10de6b=_0x4ff796;if(this[_0x10de6b(0x30b)]===undefined)this[_0x10de6b(0x376)]();this['_ItemCrafting_MainMenu'][_0x10de6b(0x20a)]=_0x5b7dea;},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x2a5)]=function(){const _0x7c6a0a=_0x4ff796;this[_0x7c6a0a(0x2e6)]={'items':{},'weapons':{},'armors':{}};},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x3fd)]=function(_0x17c0a7){return!!this['getItemCraftedTimes'](_0x17c0a7);},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x483)]=function(_0x5a5a28){const _0x20ef2d=_0x4ff796;if(!_0x5a5a28)return![];if(this[_0x20ef2d(0x2e6)]===undefined)this['initItemCraftingSys']();let _0x46f87e={};if(DataManager[_0x20ef2d(0x30f)](_0x5a5a28))_0x46f87e=this['_itemsCrafted']['items'];if(DataManager[_0x20ef2d(0x464)](_0x5a5a28))_0x46f87e=this[_0x20ef2d(0x2e6)][_0x20ef2d(0x285)];if(DataManager[_0x20ef2d(0x438)](_0x5a5a28))_0x46f87e=this[_0x20ef2d(0x2e6)][_0x20ef2d(0x341)];return _0x46f87e[_0x5a5a28['id']]||0x0;},Game_System[_0x4ff796(0x2f5)]['registerCraftedItem']=function(_0x5d4977,_0x382856){const _0x16a941=_0x4ff796;if(!_0x5d4977)return![];if(this[_0x16a941(0x2e6)]===undefined)this['initItemCraftingSys']();_0x382856=_0x382856||0x1;let _0x4a9b38={};if(DataManager[_0x16a941(0x30f)](_0x5d4977))_0x4a9b38=this[_0x16a941(0x2e6)][_0x16a941(0x351)];if(DataManager[_0x16a941(0x464)](_0x5d4977))_0x4a9b38=this[_0x16a941(0x2e6)][_0x16a941(0x285)];if(DataManager['isArmor'](_0x5d4977))_0x4a9b38=this[_0x16a941(0x2e6)][_0x16a941(0x341)];_0x4a9b38[_0x5d4977['id']]=_0x4a9b38[_0x5d4977['id']]||0x0,_0x4a9b38[_0x5d4977['id']]+=_0x382856;},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x472)]=function(){const _0x5da8a8=_0x4ff796;this[_0x5da8a8(0x3b9)]={'items':[],'weapons':[],'armors':[]};},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x3d4)]=function(_0x556d84){const _0x479c5a=_0x4ff796;if(this['_craftingEvents']===undefined)this[_0x479c5a(0x472)]();let _0x4c1755=[];if(DataManager[_0x479c5a(0x30f)](_0x556d84))_0x4c1755=this[_0x479c5a(0x3b9)][_0x479c5a(0x351)];else{if(DataManager[_0x479c5a(0x464)](_0x556d84)){if(_0x479c5a(0x2d3)!==_0x479c5a(0x3a4))_0x4c1755=this['_craftingEvents'][_0x479c5a(0x285)];else return 0x1;}else{if(DataManager[_0x479c5a(0x438)](_0x556d84)){if(_0x479c5a(0x1fa)!==_0x479c5a(0x1fa)){const _0xd869fc=_0x517955+(this[_0x479c5a(0x39a)]()-_0x58727f[_0x479c5a(0x414)])/0x2;this['drawIcon'](_0x3f5bce,_0x24eae6,_0xd869fc);const _0x10dc5d=_0x3473d0[_0x479c5a(0x1f9)]+0x4;_0x8285ab+=_0x10dc5d;}else _0x4c1755=this[_0x479c5a(0x3b9)][_0x479c5a(0x341)];}}}!_0x4c1755['includes'](_0x556d84['id'])&&(_0x479c5a(0x431)!==_0x479c5a(0x431)?_0x5066b6['note']['match'](_0x4af8c4['ItemCraftingSys']['RegExp']['jsOnCraft'])&&_0x31f320[_0x479c5a(0x367)][_0x479c5a(0x3f3)](_0x1ff3b7,_0x46c231['$1']):_0x4c1755[_0x479c5a(0x2cd)](_0x556d84['id']));},Game_System[_0x4ff796(0x2f5)][_0x4ff796(0x456)]=function(_0x470c6c){const _0x510c3c=_0x4ff796;if(this[_0x510c3c(0x3b9)]===undefined)this[_0x510c3c(0x472)]();let _0x87f873=[];if(DataManager[_0x510c3c(0x30f)](_0x470c6c))_0x87f873=this[_0x510c3c(0x3b9)][_0x510c3c(0x351)];else{if(DataManager[_0x510c3c(0x464)](_0x470c6c))_0x510c3c(0x25c)===_0x510c3c(0x2aa)?this[_0x510c3c(0x257)]():_0x87f873=this[_0x510c3c(0x3b9)][_0x510c3c(0x285)];else DataManager[_0x510c3c(0x438)](_0x470c6c)&&(_0x87f873=this[_0x510c3c(0x3b9)][_0x510c3c(0x341)]);}return _0x87f873[_0x510c3c(0x24c)](_0x470c6c['id']);},VisuMZ['ItemCraftingSys']['Game_Party_numItems']=Game_Party[_0x4ff796(0x2f5)][_0x4ff796(0x3df)],Game_Party[_0x4ff796(0x2f5)][_0x4ff796(0x3df)]=function(_0x1101bc){const _0xea082f=_0x4ff796;if(DataManager[_0xea082f(0x3fb)](_0x1101bc))return 0x0;return VisuMZ[_0xea082f(0x367)][_0xea082f(0x2f8)][_0xea082f(0x247)](this,_0x1101bc);},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x2b7)]=Game_Party[_0x4ff796(0x2f5)][_0x4ff796(0x48e)],Game_Party['prototype'][_0x4ff796(0x48e)]=function(_0x31c9a6,_0x72fbe2,_0x23ef9b){const _0x18d81c=_0x4ff796;DataManager[_0x18d81c(0x3fb)](_0x31c9a6)&&_0x72fbe2>0x0?this[_0x18d81c(0x2d9)](_0x31c9a6,_0x72fbe2):VisuMZ[_0x18d81c(0x367)][_0x18d81c(0x2b7)][_0x18d81c(0x247)](this,_0x31c9a6,_0x72fbe2,_0x23ef9b);},Game_Party[_0x4ff796(0x2f5)][_0x4ff796(0x2d9)]=function(_0x1d75ca,_0x17864c){const _0x5a1f0b=_0x4ff796,_0x5a773a=DataManager[_0x5a1f0b(0x2a8)](_0x1d75ca),_0x3f9e62=[_0x5a1f0b(0x351),_0x5a1f0b(0x285),_0x5a1f0b(0x341)];for(const _0x59af8a of _0x3f9e62){if(_0x5a1f0b(0x428)!=='VFwWU'){const _0x4f0f2d=_0x5a773a[_0x59af8a];for(const _0x45078c in _0x4f0f2d){const _0x5c9582=Number(_0x45078c),_0x517178=(_0x4f0f2d[_0x45078c]||0x1)*_0x17864c;let _0x227999=null;if(_0x59af8a===_0x5a1f0b(0x351))_0x227999=$dataItems[_0x5c9582];if(_0x59af8a==='weapons')_0x227999=$dataWeapons[_0x5c9582];if(_0x59af8a===_0x5a1f0b(0x341))_0x227999=$dataArmors[_0x5c9582];if(DataManager[_0x5a1f0b(0x3e9)](_0x227999))continue;_0x227999&&(_0x5a1f0b(0x26c)===_0x5a1f0b(0x46d)?this[_0x5a1f0b(0x31e)]():(this[_0x5a1f0b(0x48e)](_0x227999,_0x517178),![]&&(_0x5a1f0b(0x3c8)!=='sOglt'?(typeof _0x97ba74===_0x5a1f0b(0x292)&&_0x1ad3f3['match'](/CATEGORY/i)&&(_0xea7f23=this['_ingredientsList'][_0x287a2d],_0x2db9c8+=0x1),_0x58c11c['loseItem'](_0x4bd0e6,_0x3a25d6,![])):console[_0x5a1f0b(0x286)](_0x227999[_0x5a1f0b(0x33d)]+'\x20x'+_0x517178))));}}else this['createStatusWindow'](),this[_0x5a1f0b(0x29b)](this[_0x5a1f0b(0x27a)]);}},Game_Party[_0x4ff796(0x2f5)][_0x4ff796(0x24d)]=function(_0x32825c){const _0x12e28f=_0x4ff796,_0x25ba18=DataManager[_0x12e28f(0x2a8)](_0x32825c),_0x3460ad=[_0x12e28f(0x351),_0x12e28f(0x285),_0x12e28f(0x341)];for(const _0x4e784d of _0x3460ad){const _0x14e075=_0x25ba18[_0x4e784d];for(const _0x33c677 in _0x14e075){if(_0x12e28f(0x3fe)!==_0x12e28f(0x3fe))return _0x341346[_0x12e28f(0x2c8)]?![]:!![];else{const _0x20948f=Number(_0x33c677);let _0x5703e8=null;if(_0x4e784d===_0x12e28f(0x351))_0x5703e8=$dataItems[_0x20948f];if(_0x4e784d===_0x12e28f(0x285))_0x5703e8=$dataWeapons[_0x20948f];if(_0x4e784d===_0x12e28f(0x341))_0x5703e8=$dataArmors[_0x20948f];if(DataManager[_0x12e28f(0x3e9)](_0x5703e8))continue;if(_0x5703e8&&!this['hasMaxItems'](_0x5703e8)){if('sWzMr'===_0x12e28f(0x320)){if(_0x36c513[_0x12e28f(0x367)]['Settings'][_0x12e28f(0x380)][_0x12e28f(0x1f7)])return _0x146f6a[_0x12e28f(0x367)][_0x12e28f(0x454)]['Window'][_0x12e28f(0x1f7)][_0x12e28f(0x247)](this);const _0x27a9b1=this[_0x12e28f(0x276)](),_0x2caf43=this[_0x12e28f(0x405)](0x1,!![]),_0x1541bf=this[_0x12e28f(0x337)]()?0x0:_0x26fab2[_0x12e28f(0x338)]-_0x27a9b1,_0x126378=this[_0x12e28f(0x296)]();return new _0x3ec217(_0x1541bf,_0x126378,_0x27a9b1,_0x2caf43);}else return![];}}}}return!![];},Game_Party['prototype'][_0x4ff796(0x395)]=function(_0x5eadff){const _0x3b1f72=_0x4ff796;let _0x56900c=0x0;const _0x277f34=DataManager[_0x3b1f72(0x2a8)](_0x5eadff),_0x28afc2=['items',_0x3b1f72(0x285),_0x3b1f72(0x341)];for(const _0x1c4724 of _0x28afc2){if(_0x3b1f72(0x452)!==_0x3b1f72(0x242)){const _0x44db21=_0x277f34[_0x1c4724];for(const _0x5456f9 in _0x44db21){const _0x3b871e=Number(_0x5456f9),_0x5459b2=_0x44db21[_0x5456f9]||0x1;let _0x168480=null;if(_0x1c4724===_0x3b1f72(0x351))_0x168480=$dataItems[_0x3b871e];if(_0x1c4724===_0x3b1f72(0x285))_0x168480=$dataWeapons[_0x3b871e];if(_0x1c4724==='armors')_0x168480=$dataArmors[_0x3b871e];if(DataManager['isProxyItem'](_0x168480))continue;if(_0x168480){const _0x36ff0c=this[_0x3b1f72(0x46f)](_0x168480),_0x46578f=this[_0x3b1f72(0x3df)](_0x168480),_0x1a70ab=_0x36ff0c-_0x46578f;if(_0x1a70ab>0x0){let _0x5e8899=_0x1a70ab/_0x5459b2;_0x5e8899=Math[_0x3b1f72(0x473)](_0x5e8899),_0x56900c=Math['max'](_0x56900c,_0x5e8899);}}}}else this[_0x3b1f72(0x234)](_0x2f5c27,_0x1fee7c,_0x382985,_0x4fef19);}return _0x56900c;},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x388)]=Scene_Menu[_0x4ff796(0x2f5)][_0x4ff796(0x37b)],Scene_Menu[_0x4ff796(0x2f5)]['createCommandWindow']=function(){const _0x2fe193=_0x4ff796;VisuMZ['ItemCraftingSys'][_0x2fe193(0x388)][_0x2fe193(0x247)](this);const _0x441466=this[_0x2fe193(0x3eb)];_0x441466['setHandler'](_0x2fe193(0x485),this[_0x2fe193(0x315)][_0x2fe193(0x486)](this));},Scene_Menu['prototype'][_0x4ff796(0x315)]=function(){const _0x5a9c4e=_0x4ff796;SceneManager[_0x5a9c4e(0x2cd)](Scene_ItemCrafting);};function Scene_ItemCrafting(){this['initialize'](...arguments);}Scene_ItemCrafting['prototype']=Object[_0x4ff796(0x23a)](Scene_Item['prototype']),Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x38a)]=Scene_ItemCrafting,Scene_ItemCrafting[_0x4ff796(0x2f5)]['initialize']=function(){const _0x3c8756=_0x4ff796;Scene_Item[_0x3c8756(0x2f5)][_0x3c8756(0x378)]['call'](this),$gameSystem[_0x3c8756(0x45b)]=undefined;},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x45c)]=function(){const _0xd274b7=_0x4ff796;Scene_Item[_0xd274b7(0x2f5)][_0xd274b7(0x45c)][_0xd274b7(0x247)](this),this[_0xd274b7(0x1f0)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x23a)]=function(){const _0x5cb5f9=_0x4ff796;Scene_Item[_0x5cb5f9(0x2f5)][_0x5cb5f9(0x23a)][_0x5cb5f9(0x247)](this),this[_0x5cb5f9(0x443)](),this[_0x5cb5f9(0x21c)](),this[_0x5cb5f9(0x27b)](),this['createIngredientSelectionList']();if(this[_0x5cb5f9(0x3c9)]()){if(_0x5cb5f9(0x347)==='sMfls')this['onCategoryOk']();else return _0x9cbfb9[_0x5cb5f9(0x480)][_0x5cb5f9(0x2ec)][_0x5cb5f9(0x24c)](_0x251555);}this[_0x5cb5f9(0x374)](),this[_0x5cb5f9(0x2ac)]();},Scene_ItemCrafting['prototype']['setWindowBackgroundTypes']=function(){const _0x450e69=_0x4ff796,_0x36f95f=VisuMZ[_0x450e69(0x367)][_0x450e69(0x454)][_0x450e69(0x380)];if(this[_0x450e69(0x3c4)]){if('BJxXZ'==='yjBQk')return _0x34cbfb[_0x450e69(0x367)][_0x450e69(0x454)][_0x450e69(0x380)][_0x450e69(0x270)][_0x450e69(0x247)](this);else this[_0x450e69(0x3c4)][_0x450e69(0x309)](_0x36f95f[_0x450e69(0x39d)]);}this[_0x450e69(0x480)]&&this[_0x450e69(0x480)][_0x450e69(0x309)](_0x36f95f['CategoryBgType']);this[_0x450e69(0x28a)]&&('kepmw'==='kepmw'?this[_0x450e69(0x28a)]['setBackgroundType'](_0x36f95f[_0x450e69(0x2b6)]):_0x2a349e=_0x375f23[_0x450e69(0x249)](_0x2e0614));if(this[_0x450e69(0x27a)]){if(_0x450e69(0x2b0)!==_0x450e69(0x2b0))return!![];else this[_0x450e69(0x27a)]['setBackgroundType'](_0x36f95f[_0x450e69(0x2db)]);}if(this[_0x450e69(0x377)]){if(_0x450e69(0x284)===_0x450e69(0x240)){if(this[_0x450e69(0x2ab)]===_0x450e69(0x447)){const _0x31d12b=_0x25ff1b[_0x450e69(0x308)];if(_0x31d12b&&_0x31d12b[_0x450e69(0x480)]&&_0x31d12b[_0x450e69(0x480)][_0x450e69(0x2ec)])return _0x31d12b[_0x450e69(0x480)][_0x450e69(0x2ec)][_0x450e69(0x24c)](_0x4668c0);}return _0x1b77ac[_0x450e69(0x2f5)][_0x450e69(0x24c)]['call'](this,_0x3b1f2);}else this['_statusWindow'][_0x450e69(0x309)](_0x36f95f[_0x450e69(0x324)]);}this[_0x450e69(0x271)]&&this[_0x450e69(0x271)]['setBackgroundType'](_0x36f95f[_0x450e69(0x409)]),this['_ingredientSelectList']&&this[_0x450e69(0x268)][_0x450e69(0x309)](_0x36f95f[_0x450e69(0x393)]),this[_0x450e69(0x1e4)]&&(_0x450e69(0x2dc)==='JliBx'?this[_0x450e69(0x1e4)][_0x450e69(0x309)](_0x36f95f['NumberBgType']):_0x39ca7a['push'](_0x49766c[_0x450e69(0x2e9)](_0x1e65f6['gold']()/_0x4640a9))),this['_buttonAssistWindow']&&(_0x450e69(0x40c)==='rTAML'?this[_0x450e69(0x1ed)]['setBackgroundType'](_0x36f95f[_0x450e69(0x3ad)]):(this[_0x450e69(0x299)](),this[_0x450e69(0x3b2)](),this[_0x450e69(0x40f)](),_0x4de395[_0x450e69(0x319)](),_0x1fe3c1[_0x450e69(0x319)]()));},Scene_ItemCrafting['prototype'][_0x4ff796(0x3cf)]=function(){const _0x4db127=_0x4ff796;return Scene_Shop[_0x4db127(0x2f5)][_0x4db127(0x222)][_0x4db127(0x247)](this);},Scene_ItemCrafting['prototype'][_0x4ff796(0x443)]=function(){const _0x4cfc41=_0x4ff796,_0x535ca8=this['goldWindowRect']();this[_0x4cfc41(0x28a)]=new Window_Gold(_0x535ca8),this[_0x4cfc41(0x29b)](this[_0x4cfc41(0x28a)]);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3b6)]=function(){const _0x4d8019=_0x4ff796;return Scene_Shop[_0x4d8019(0x2f5)]['goldWindowRectItemsEquipsCore'][_0x4d8019(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x1ee)]=function(){const _0x502069=_0x4ff796;return Scene_Shop[_0x502069(0x2f5)]['commandWindowRectItemsEquipsCore'][_0x502069(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x1ff)]=function(){const _0x195ee0=_0x4ff796;this[_0x195ee0(0x2d5)](),this['isUseModernControls']()&&this[_0x195ee0(0x34f)](),this[_0x195ee0(0x32d)]()&&(this[_0x195ee0(0x36d)](),this[_0x195ee0(0x29b)](this['_itemWindow']));},Scene_ItemCrafting[_0x4ff796(0x2f5)]['createItemWindowBase']=function(){const _0x48f946=_0x4ff796,_0x25a8cd=this[_0x48f946(0x2e0)]();this[_0x48f946(0x27a)]=new Window_ItemCraftingList(_0x25a8cd),this[_0x48f946(0x27a)]['setHelpWindow'](this[_0x48f946(0x3c4)]),this[_0x48f946(0x27a)][_0x48f946(0x2ed)]('ok',this[_0x48f946(0x3a3)][_0x48f946(0x486)](this)),this[_0x48f946(0x27a)]['setHandler'](_0x48f946(0x2d2),this[_0x48f946(0x206)][_0x48f946(0x486)](this)),this['addWindow'](this[_0x48f946(0x27a)]),this[_0x48f946(0x480)][_0x48f946(0x2ca)](this[_0x48f946(0x27a)]),!this[_0x48f946(0x480)][_0x48f946(0x26a)]()&&(this[_0x48f946(0x27a)]['y']-=this[_0x48f946(0x480)][_0x48f946(0x26d)],this[_0x48f946(0x27a)][_0x48f946(0x26d)]+=this[_0x48f946(0x480)][_0x48f946(0x26d)],this['_categoryWindow'][_0x48f946(0x453)](),this[_0x48f946(0x480)]['deactivate'](),this['onCategoryOk']());},Scene_ItemCrafting[_0x4ff796(0x2f5)]['itemWindowRect']=function(){const _0xcd8e10=_0x4ff796;return this[_0xcd8e10(0x3eb)]=this['_categoryWindow'],Scene_Shop[_0xcd8e10(0x2f5)][_0xcd8e10(0x448)]['call'](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x406)]=function(){const _0x174793=_0x4ff796;return Scene_Shop[_0x174793(0x2f5)][_0x174793(0x207)][_0x174793(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x21c)]=function(){const _0x38ae52=_0x4ff796,_0x5193f2=this[_0x38ae52(0x2e0)]();this[_0x38ae52(0x1e4)]=new Window_ItemCraftingNumber(_0x5193f2),this[_0x38ae52(0x1e4)][_0x38ae52(0x453)](),this[_0x38ae52(0x1e4)][_0x38ae52(0x2ed)]('ok',this[_0x38ae52(0x458)]['bind'](this)),this[_0x38ae52(0x1e4)][_0x38ae52(0x2ed)](_0x38ae52(0x2d2),this['onNumberCancel']['bind'](this)),this[_0x38ae52(0x29b)](this[_0x38ae52(0x1e4)]);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x27b)]=function(){const _0x1920f5=_0x4ff796,_0x4a04cb=this[_0x1920f5(0x1ee)]();this['_ingredientSelectTitle']=new Window_Selectable(_0x4a04cb),this[_0x1920f5(0x271)][_0x1920f5(0x453)](),this['addWindow'](this[_0x1920f5(0x271)]);},Scene_ItemCrafting[_0x4ff796(0x2f5)]['createIngredientSelectionList']=function(){const _0x5cbd63=_0x4ff796,_0x3802d6=this[_0x5cbd63(0x2e0)](),_0x35375c=new Window_ItemCraftingIngredient(_0x3802d6);_0x35375c[_0x5cbd63(0x453)](),_0x35375c[_0x5cbd63(0x469)](this[_0x5cbd63(0x3c4)]),_0x35375c[_0x5cbd63(0x35e)](this[_0x5cbd63(0x377)]),_0x35375c[_0x5cbd63(0x2ed)]('ok',this[_0x5cbd63(0x2a2)]['bind'](this)),_0x35375c[_0x5cbd63(0x2ed)]('cancel',this[_0x5cbd63(0x3dd)][_0x5cbd63(0x486)](this)),this[_0x5cbd63(0x268)]=_0x35375c,this['addWindow'](this[_0x5cbd63(0x268)]);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x442)]=function(){const _0x4ac2c4=_0x4ff796;return VisuMZ[_0x4ac2c4(0x367)][_0x4ac2c4(0x454)][_0x4ac2c4(0x380)]['EnableCustomLayout'];},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3cf)]=function(){const _0x2a601d=_0x4ff796;return this['isCustomLayout']()?this[_0x2a601d(0x280)]():Scene_Shop[_0x2a601d(0x2f5)][_0x2a601d(0x222)][_0x2a601d(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x280)]=function(){const _0x57b453=_0x4ff796;if(VisuMZ[_0x57b453(0x367)][_0x57b453(0x454)][_0x57b453(0x380)]['HelpWindow_RectJS']){if('kXWjR'!==_0x57b453(0x260)){_0x567c7a[_0x57b453(0x2c2)]()&&_0x2beb7d(_0x123913[_0x57b453(0x367)][_0x57b453(0x2f7)]);return;}else return VisuMZ[_0x57b453(0x367)][_0x57b453(0x454)][_0x57b453(0x380)][_0x57b453(0x270)]['call'](this);}const _0x352d0f=0x0,_0xc0edfa=this[_0x57b453(0x48f)](),_0x53dc66=Graphics[_0x57b453(0x338)],_0x39b57c=this[_0x57b453(0x305)]();return new Rectangle(_0x352d0f,_0xc0edfa,_0x53dc66,_0x39b57c);},Scene_ItemCrafting[_0x4ff796(0x2f5)]['categoryWindowRect']=function(){const _0x1e020e=_0x4ff796;return this[_0x1e020e(0x442)]()?this[_0x1e020e(0x3da)]():Scene_Shop[_0x1e020e(0x2f5)]['commandWindowRectItemsEquipsCore'][_0x1e020e(0x247)](this);},Scene_ItemCrafting['prototype'][_0x4ff796(0x3da)]=function(){const _0xac51de=_0x4ff796;if(VisuMZ[_0xac51de(0x367)][_0xac51de(0x454)]['Window'][_0xac51de(0x237)]){if(_0xac51de(0x279)===_0xac51de(0x279))return VisuMZ[_0xac51de(0x367)][_0xac51de(0x454)][_0xac51de(0x380)][_0xac51de(0x237)][_0xac51de(0x247)](this);else this[_0xac51de(0x31e)](),this['_itemWindow'][_0xac51de(0x449)](),this['_categoryWindow'][_0xac51de(0x449)](),this['_categoryWindow']['refreshCursor'](),this[_0xac51de(0x480)]['callUpdateHelp'](),this[_0xac51de(0x28a)]['refresh'](),this[_0xac51de(0x27a)][_0xac51de(0x1f1)]();}const _0x1e11fb=this[_0xac51de(0x337)]()?this['mainCommandWidth']():0x0,_0x19e3b7=this[_0xac51de(0x296)](),_0x2154a8=Graphics['boxWidth']-this['mainCommandWidth'](),_0x4a664a=this['calcWindowHeight'](0x1,!![]);return new Rectangle(_0x1e11fb,_0x19e3b7,_0x2154a8,_0x4a664a);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3b6)]=function(){const _0x4579fe=_0x4ff796;if(this['isCustomLayout']()){if(_0x4579fe(0x3e1)===_0x4579fe(0x3e1))return this['goldWindowRectJS']();else this['contents'][_0x4579fe(0x263)](_0x2e4066['x'],_0x5e61b6['y'],_0x4471fa,_0xd514cb,_0x3641ec,_0x3859ed),this[_0x4579fe(0x253)][_0x4579fe(0x263)](_0x3fd981['x']+_0x54dd48,_0x12e772['y'],_0xd1c0fd,_0x22c1b8,_0x2162cd,_0x31054b);}else{if('KRbJQ'==='KRbJQ')return Scene_Shop[_0x4579fe(0x2f5)][_0x4579fe(0x1e7)][_0x4579fe(0x247)](this);else _0x2a68ec[_0x4579fe(0x48c)](/CATEGORY: (.*)/i),_0xf86fe2=_0x3e1875(_0x27ce88['$1'])['trim']();}},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x38f)]=function(){const _0x9d5bfc=_0x4ff796;if(VisuMZ[_0x9d5bfc(0x367)][_0x9d5bfc(0x454)][_0x9d5bfc(0x380)][_0x9d5bfc(0x1f7)])return VisuMZ[_0x9d5bfc(0x367)][_0x9d5bfc(0x454)][_0x9d5bfc(0x380)]['GoldWindow_RectJS'][_0x9d5bfc(0x247)](this);const _0x17ebbd=this[_0x9d5bfc(0x276)](),_0x1cf769=this[_0x9d5bfc(0x405)](0x1,!![]),_0x47187c=this[_0x9d5bfc(0x337)]()?0x0:Graphics[_0x9d5bfc(0x338)]-_0x17ebbd,_0x386d74=this[_0x9d5bfc(0x296)]();return new Rectangle(_0x47187c,_0x386d74,_0x17ebbd,_0x1cf769);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x2e0)]=function(){const _0x63e3d1=_0x4ff796;this['_commandWindow']=this[_0x63e3d1(0x480)];if(this[_0x63e3d1(0x442)]()){if(_0x63e3d1(0x46b)!==_0x63e3d1(0x214))return this[_0x63e3d1(0x1f8)]();else this[_0x63e3d1(0x33b)]=this[_0x63e3d1(0x33b)][_0x63e3d1(0x3bc)](_0x52d4b4['ItemCraftingSys'][_0x63e3d1(0x454)][_0x63e3d1(0x3c2)][_0x63e3d1(0x3cd)]);}else return Scene_Shop[_0x63e3d1(0x2f5)][_0x63e3d1(0x448)][_0x63e3d1(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x1f8)]=function(){const _0x2317c3=_0x4ff796;if(VisuMZ[_0x2317c3(0x367)][_0x2317c3(0x454)][_0x2317c3(0x380)][_0x2317c3(0x333)])return VisuMZ[_0x2317c3(0x367)][_0x2317c3(0x454)][_0x2317c3(0x380)][_0x2317c3(0x333)][_0x2317c3(0x247)](this);const _0x3c6bc7=this[_0x2317c3(0x3eb)]['y']+this[_0x2317c3(0x3eb)][_0x2317c3(0x26d)],_0x2c794e=Graphics['boxWidth']-this[_0x2317c3(0x365)](),_0x11ac17=this['mainAreaHeight']()-this[_0x2317c3(0x3eb)][_0x2317c3(0x26d)],_0x3157ca=this[_0x2317c3(0x337)]()?Graphics[_0x2317c3(0x338)]-_0x2c794e:0x0;return new Rectangle(_0x3157ca,_0x3c6bc7,_0x2c794e,_0x11ac17);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x32d)]=function(){const _0x5bfaf7=_0x4ff796;if(this[_0x5bfaf7(0x442)]())return!![];return Scene_Item[_0x5bfaf7(0x2f5)]['allowCreateStatusWindow'][_0x5bfaf7(0x247)](this);},Scene_ItemCrafting['prototype'][_0x4ff796(0x406)]=function(){const _0x1cb21b=_0x4ff796;return this[_0x1cb21b(0x442)]()?this[_0x1cb21b(0x20e)]():_0x1cb21b(0x375)!=='YobTg'?0x0:Scene_Shop['prototype'][_0x1cb21b(0x207)][_0x1cb21b(0x247)](this);},Scene_ItemCrafting['prototype']['statusWindowRectJS']=function(){const _0x15e354=_0x4ff796;if(VisuMZ[_0x15e354(0x367)]['Settings'][_0x15e354(0x380)][_0x15e354(0x45d)])return VisuMZ[_0x15e354(0x367)][_0x15e354(0x454)]['Window'][_0x15e354(0x45d)][_0x15e354(0x247)](this);const _0x1ef206=this[_0x15e354(0x365)](),_0x436eb2=this[_0x15e354(0x3ed)]()-this[_0x15e354(0x3eb)][_0x15e354(0x26d)],_0x3f2560=this[_0x15e354(0x337)]()?0x0:Graphics[_0x15e354(0x338)]-_0x1ef206,_0x2c029b=this['_commandWindow']['y']+this['_commandWindow']['height'];return new Rectangle(_0x3f2560,_0x2c029b,_0x1ef206,_0x436eb2);},Scene_ItemCrafting['prototype'][_0x4ff796(0x303)]=function(){const _0x2756ea=_0x4ff796;this['_itemWindow'][_0x2756ea(0x22a)](),this[_0x2756ea(0x27a)][_0x2756ea(0x246)](0x0);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3a3)]=function(){const _0x1dc6f3=_0x4ff796;$gameTemp[_0x1dc6f3(0x267)]=!![],this['_item']=this['_itemWindow'][_0x1dc6f3(0x2c0)](),this[_0x1dc6f3(0x27a)][_0x1dc6f3(0x453)](),this['clearUserSelectedIngredients']();if(this[_0x1dc6f3(0x348)]())this[_0x1dc6f3(0x3a1)]();else{if('yiRsR'===_0x1dc6f3(0x468))return _0x58468b['getInputMultiButtonStrings']('up','down');else this['setupNumberWindow']();}$gameTemp[_0x1dc6f3(0x267)]=![],this['_item']=this[_0x1dc6f3(0x27a)][_0x1dc6f3(0x2c0)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x289)]=function(){const _0x36d024=_0x4ff796;this['_ingredientSelectTitle'][_0x36d024(0x453)](),this[_0x36d024(0x268)][_0x36d024(0x453)](),this['_categoryWindow'][_0x36d024(0x342)](),$gameTemp['_bypassProxy']=!![],this['_numberWindow'][_0x36d024(0x371)](this[_0x36d024(0x27a)][_0x36d024(0x2c0)]()),$gameTemp[_0x36d024(0x267)]=![],this[_0x36d024(0x1e4)][_0x36d024(0x342)](),this[_0x36d024(0x1e4)][_0x36d024(0x22a)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)]['activateItemWindow']=function(){const _0x113ea4=_0x4ff796;this['_numberWindow']['hide'](),this['_ingredientSelectTitle'][_0x113ea4(0x453)](),this['_ingredientSelectList'][_0x113ea4(0x453)](),this[_0x113ea4(0x480)][_0x113ea4(0x342)](),this['_itemWindow'][_0x113ea4(0x342)](),this['_itemWindow']['activate'](),this[_0x113ea4(0x27a)][_0x113ea4(0x1f1)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x458)]=function(){const _0x56e345=_0x4ff796;if(VisuMZ[_0x56e345(0x367)][_0x56e345(0x454)][_0x56e345(0x3c2)]['ShowAnimations'])this[_0x56e345(0x304)]();else{if(_0x56e345(0x412)===_0x56e345(0x412))this[_0x56e345(0x40f)]();else return _0xd11fa5[_0x56e345(0x2f5)]['buyWindowRectItemsEquipsCore'][_0x56e345(0x247)](this);}},Scene_ItemCrafting[_0x4ff796(0x2f5)]['finishAnimation']=function(){const _0x5c7734=_0x4ff796;this[_0x5c7734(0x3cc)]['visible']=!![],this['_animationPlaying']=![],this[_0x5c7734(0x251)](),this[_0x5c7734(0x24e)](),this[_0x5c7734(0x3f1)]();},Scene_ItemCrafting['prototype']['onAnimationFinish']=function(){const _0x292f20=_0x4ff796;if(this[_0x292f20(0x387)]())this[_0x292f20(0x2e4)]();else{if('Gkhdp'!==_0x292f20(0x2bd))this[_0x292f20(0x46e)]();else return'#%1'[_0x292f20(0x3d7)](_0x4ef9a3(_0x5c6d33['$1']));}},Scene_ItemCrafting[_0x4ff796(0x2f5)]['returnBackToItemWindow']=function(){const _0x5472c2=_0x4ff796;this['activateItemWindow'](),this[_0x5472c2(0x27a)][_0x5472c2(0x449)](),this['_categoryWindow'][_0x5472c2(0x449)](),this[_0x5472c2(0x480)]['refreshCursor'](),this[_0x5472c2(0x480)]['callUpdateHelp'](),this[_0x5472c2(0x28a)][_0x5472c2(0x449)](),this[_0x5472c2(0x27a)][_0x5472c2(0x1f1)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x251)]=function(){const _0x10dc4f=_0x4ff796;$gameTemp['_bypassProxy']=!![];let _0x19b725=this[_0x10dc4f(0x27a)][_0x10dc4f(0x2c0)]();$gameTemp['_bypassProxy']=![];const _0x552aa8=this[_0x10dc4f(0x1e4)][_0x10dc4f(0x2e8)](),_0x13a41b=DataManager[_0x10dc4f(0x32f)](_0x19b725);let _0x8faeb9=0x0;for(const _0x5351b9 of _0x13a41b){if(_0x10dc4f(0x217)!==_0x10dc4f(0x217)){_0x25530e[_0x10dc4f(0x249)]&&(_0x1745ce=_0x270c53[_0x10dc4f(0x249)](_0x3f48fa));if(_0x140442[_0x10dc4f(0x24b)][_0x10dc4f(0x48c)](_0x4f7402[_0x10dc4f(0x367)]['RegExp'][_0x10dc4f(0x259)]))return _0x4034fe(_0x394737['$1']);else{const _0x4fb43b=_0xdd41ae[_0x10dc4f(0x3a5)];return _0x1ff6c8(_0x42414f[_0x10dc4f(0x33d)][_0x10dc4f(0x25e)]+0x1)[_0x10dc4f(0x264)](_0x4fb43b);}}else{if(!_0x5351b9)continue;let _0x1c7d7b=_0x5351b9[0x0];const _0x27c6fa=_0x5351b9[0x1]*_0x552aa8;_0x1c7d7b===_0x10dc4f(0x3aa)?$gameParty[_0x10dc4f(0x418)](_0x27c6fa):(typeof _0x1c7d7b===_0x10dc4f(0x292)&&_0x1c7d7b['match'](/CATEGORY/i)&&(_0x1c7d7b=this[_0x10dc4f(0x23d)][_0x8faeb9],_0x8faeb9+=0x1),$gameParty['loseItem'](_0x1c7d7b,_0x27c6fa,![]));}}_0x19b725=this[_0x10dc4f(0x27a)]['item'](),$gameParty[_0x10dc4f(0x48e)](_0x19b725,_0x552aa8),this[_0x10dc4f(0x1e4)][_0x10dc4f(0x2e8)]()>0x0?SoundManager[_0x10dc4f(0x1fb)]():SoundManager[_0x10dc4f(0x42f)](),$gameSystem[_0x10dc4f(0x20d)](_0x19b725,_0x552aa8);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x24e)]=function(){const _0x2dbd37=_0x4ff796,_0x3740de=this[_0x2dbd37(0x21b)],_0x59b7a2=this['_numberWindow'][_0x2dbd37(0x2e8)]();VisuMZ['ItemCraftingSys']['TurnSwitches'](_0x3740de,!![]),VisuMZ[_0x2dbd37(0x367)]['TurnSwitches'](_0x3740de,![]),this[_0x2dbd37(0x31f)]();const _0x277ccd=DataManager[_0x2dbd37(0x32c)](_0x3740de);if(VisuMZ[_0x2dbd37(0x367)]['JS'][_0x277ccd]){if(_0x2dbd37(0x3a8)!==_0x2dbd37(0x32a))VisuMZ[_0x2dbd37(0x367)]['JS'][_0x277ccd][_0x2dbd37(0x247)](this,_0x3740de,_0x59b7a2);else{const _0x11d153=this[_0x2dbd37(0x2e0)](),_0x56412c=new _0x26f7c6(_0x11d153);_0x56412c[_0x2dbd37(0x453)](),_0x56412c['setHelpWindow'](this[_0x2dbd37(0x3c4)]),_0x56412c[_0x2dbd37(0x35e)](this['_statusWindow']),_0x56412c[_0x2dbd37(0x2ed)]('ok',this[_0x2dbd37(0x2a2)]['bind'](this)),_0x56412c[_0x2dbd37(0x2ed)]('cancel',this[_0x2dbd37(0x3dd)][_0x2dbd37(0x486)](this)),this[_0x2dbd37(0x268)]=_0x56412c,this[_0x2dbd37(0x29b)](this[_0x2dbd37(0x268)]);}}VisuMZ['ItemCraftingSys'][_0x2dbd37(0x454)][_0x2dbd37(0x2d6)]['jsGlobalCraftEffect'][_0x2dbd37(0x247)](this,_0x3740de,_0x59b7a2);},VisuMZ[_0x4ff796(0x367)]['TurnSwitches']=function(_0x5029b3,_0x2b7ba2){const _0x56a9af=_0x4ff796,_0x39d435=_0x2b7ba2?VisuMZ['ItemCraftingSys'][_0x56a9af(0x37a)]['OnSwitches']:VisuMZ['ItemCraftingSys'][_0x56a9af(0x37a)][_0x56a9af(0x25a)],_0x2aed29=_0x5029b3[_0x56a9af(0x24b)][_0x56a9af(0x48c)](_0x39d435);if(_0x2aed29)for(const _0x87d3dc of _0x2aed29){if('Qdalz'!==_0x56a9af(0x354)){if(_0x3a3312[_0x56a9af(0x20c)]){let _0x27d947=_0x1b6718-_0x29f8cc[_0x56a9af(0x445)](_0x4b92e3[_0x56a9af(0x1f9)]/0x2),_0x1b613e=_0x133f92+_0x3d63d4['round']((this[_0x56a9af(0x39a)]()-_0x34e58f['iconHeight'])/0x2);const _0x11c2d0=_0x259320[_0x56a9af(0x238)]?_0xee2e45[_0x56a9af(0x238)][_0x56a9af(0x454)][_0x56a9af(0x3b4)][_0x56a9af(0x3b7)]:0x0;this[_0x56a9af(0x3bd)](_0x11c2d0,_0x27d947,_0x1b613e);}else{let _0xec8686=_0x52b1ed-_0x7d90b9[_0x56a9af(0x445)](_0x1c2ab0/0x2),_0xfd2b94=_0x2b2e27+_0x27e5a1['round']((this[_0x56a9af(0x39a)]()-_0x443b77['iconHeight'])/0x2);this[_0x56a9af(0x385)](_0x20ad90['systemColor']()),this[_0x56a9af(0x250)](),this[_0x56a9af(0x307)](_0x191bff[_0x56a9af(0x41a)],_0xec8686,_0xfd2b94,_0x4b244e,_0x56a9af(0x30a)),this['resetFontSettings']();}let _0x34e097=_0x573134-_0x39f020[_0x56a9af(0x445)](_0x3024e5/0x2),_0x4b955f=_0x252d36+this[_0x56a9af(0x39a)]();const _0x49e7ef=_0x280872[_0x56a9af(0x202)][_0x56a9af(0x454)]['ItemScene'][_0x56a9af(0x281)];let _0x3eebb6=_0x49e7ef[_0x56a9af(0x3d7)](_0x4afded);_0x33b9d9>_0x5cddc1&&this['changeTextColor'](_0x2368b7[_0x56a9af(0x427)]()),this[_0x56a9af(0x253)][_0x56a9af(0x478)]=_0x1ff749[_0x56a9af(0x28c)],this['drawText'](_0x3eebb6,_0x34e097,_0x4b955f,_0x280cda,'center');}else{if(!_0x87d3dc)continue;_0x87d3dc['match'](_0x39d435);const _0x2c1878=JSON[_0x56a9af(0x35a)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x397acb of _0x2c1878){$gameSwitches[_0x56a9af(0x343)](_0x397acb,_0x2b7ba2);}}}},Scene_ItemCrafting['prototype']['onNumberCancel']=function(){const _0x1ccbff=_0x4ff796;SoundManager[_0x1ccbff(0x42f)](),this[_0x1ccbff(0x3dd)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x2a2)]=function(){const _0x56d42a=_0x4ff796,_0x1fb23e=this['_ingredientSelectList'][_0x56d42a(0x2c0)]();this[_0x56d42a(0x23d)][this[_0x56d42a(0x323)]]=_0x1fb23e,this['_ingredientIndex']++,this[_0x56d42a(0x3a1)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3dd)]=function(){const _0x5a9995=_0x4ff796;this['_ingredientsList'][_0x5a9995(0x455)](),this['_ingredientIndex']--;if(this[_0x5a9995(0x323)]<0x0)this[_0x5a9995(0x31e)]();else{if(_0x5a9995(0x262)===_0x5a9995(0x262))this['setupSelectIngredientWindow']();else return _0x4bd91c[_0x5a9995(0x2af)]('left',_0x5a9995(0x459));}},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x466)]=function(){const _0x33f791=_0x4ff796;this['_ingredientCategories']=[],this[_0x33f791(0x3f9)]=[],this['_ingredientsList']=[],this[_0x33f791(0x323)]=0x0;},Scene_ItemCrafting['prototype'][_0x4ff796(0x348)]=function(){const _0x8c9760=_0x4ff796;if(!this[_0x8c9760(0x21b)])return![];const _0x1eeed5=DataManager[_0x8c9760(0x32f)](this[_0x8c9760(0x21b)]);for(const _0x17028b of _0x1eeed5){if(!_0x17028b)continue;const _0x49e771=_0x17028b[0x0];if(!_0x49e771)continue;if(typeof _0x49e771===_0x8c9760(0x292)&&_0x49e771[_0x8c9760(0x48c)](/CATEGORY/i)){if(_0x8c9760(0x39f)===_0x8c9760(0x39f)){_0x49e771[_0x8c9760(0x48c)](/CATEGORY: (.*)/i);const _0x3006a9=String(RegExp['$1'])[_0x8c9760(0x2b5)]();this[_0x8c9760(0x399)]['push'](_0x3006a9),this[_0x8c9760(0x3f9)][_0x8c9760(0x2cd)](_0x17028b[0x1]||0x1);}else this['processCraftCommonEvent']();}}return this['_ingredientCategories'][_0x8c9760(0x25e)]>0x0;},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3a1)]=function(){const _0x58bbeb=_0x4ff796;if(this[_0x58bbeb(0x323)]>=this[_0x58bbeb(0x399)][_0x58bbeb(0x25e)])return this[_0x58bbeb(0x289)]();this[_0x58bbeb(0x480)][_0x58bbeb(0x453)](),this[_0x58bbeb(0x1e4)][_0x58bbeb(0x453)]();const _0x3f0f4b=this[_0x58bbeb(0x399)][this['_ingredientIndex']],_0x3655d5=this[_0x58bbeb(0x3f9)][this['_ingredientIndex']];this[_0x58bbeb(0x271)][_0x58bbeb(0x342)](),this['_ingredientSelectList'][_0x58bbeb(0x342)](),this[_0x58bbeb(0x271)][_0x58bbeb(0x253)][_0x58bbeb(0x319)]();const _0x4e1e37=VisuMZ[_0x58bbeb(0x367)][_0x58bbeb(0x454)][_0x58bbeb(0x2d6)]['CategoryTitle'],_0x3863cb=VisuMZ[_0x58bbeb(0x202)][_0x58bbeb(0x454)][_0x58bbeb(0x349)][_0x58bbeb(0x281)],_0x2d1cfa=_0x4e1e37[_0x58bbeb(0x3d7)](_0x3f0f4b,_0x3863cb[_0x58bbeb(0x3d7)](_0x3655d5)),_0x38465b=this[_0x58bbeb(0x271)][_0x58bbeb(0x1f2)](0x0);this[_0x58bbeb(0x271)][_0x58bbeb(0x2a1)](_0x2d1cfa,_0x38465b['x'],_0x38465b['y']),this[_0x58bbeb(0x268)][_0x58bbeb(0x371)](_0x3f0f4b,_0x3655d5);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x26e)]=function(){const _0x110803=_0x4ff796;if(this['_numberWindow']&&this['_numberWindow'][_0x110803(0x327)])return TextManager[_0x110803(0x2af)](_0x110803(0x40a),_0x110803(0x459));return Scene_Item[_0x110803(0x2f5)]['buttonAssistKey1'][_0x110803(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x389)]=function(){const _0x292629=_0x4ff796;if(this[_0x292629(0x1e4)]&&this[_0x292629(0x1e4)][_0x292629(0x327)])return TextManager['getInputMultiButtonStrings']('up','down');return Scene_Item[_0x292629(0x2f5)][_0x292629(0x389)][_0x292629(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x476)]=function(){const _0x41cb9c=_0x4ff796;if(this[_0x41cb9c(0x3b1)]())return VisuMZ['ItemsEquipsCore'][_0x41cb9c(0x454)]['ItemScene'][_0x41cb9c(0x213)];else{if(this['_numberWindow']&&this[_0x41cb9c(0x1e4)][_0x41cb9c(0x327)])return VisuMZ[_0x41cb9c(0x202)][_0x41cb9c(0x454)][_0x41cb9c(0x3fc)][_0x41cb9c(0x31a)];}return Scene_Item[_0x41cb9c(0x2f5)][_0x41cb9c(0x476)][_0x41cb9c(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3bb)]=function(){const _0x2f0f45=_0x4ff796;if(this[_0x2f0f45(0x1e4)]&&this[_0x2f0f45(0x1e4)][_0x2f0f45(0x327)])return VisuMZ[_0x2f0f45(0x202)][_0x2f0f45(0x454)][_0x2f0f45(0x3fc)][_0x2f0f45(0x219)];return Scene_Item[_0x2f0f45(0x2f5)]['buttonAssistText2'][_0x2f0f45(0x247)](this);},Scene_ItemCrafting['prototype'][_0x4ff796(0x26b)]=function(){const _0x25b643=_0x4ff796;return this[_0x25b643(0x1e4)]&&this['_numberWindow'][_0x25b643(0x327)]?TextManager[_0x25b643(0x334)]:Scene_Item['prototype'][_0x25b643(0x26b)][_0x25b643(0x247)](this);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x301)]=function(){const _0x410f91=_0x4ff796;Scene_MenuBase[_0x410f91(0x2f5)][_0x410f91(0x301)]['call'](this),this[_0x410f91(0x423)](this['getBackgroundOpacity']()),this[_0x410f91(0x2fd)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)]['getBackgroundOpacity']=function(){const _0x6370b1=_0x4ff796;return VisuMZ['ItemCraftingSys']['Settings'][_0x6370b1(0x2ae)][_0x6370b1(0x2d7)];},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x2fd)]=function(){const _0x5c9c87=_0x4ff796,_0x412aa2={'BgFilename1':VisuMZ[_0x5c9c87(0x367)][_0x5c9c87(0x454)][_0x5c9c87(0x2ae)][_0x5c9c87(0x413)],'BgFilename2':VisuMZ[_0x5c9c87(0x367)]['Settings'][_0x5c9c87(0x2ae)][_0x5c9c87(0x254)]};_0x412aa2&&(_0x412aa2[_0x5c9c87(0x413)]!==''||_0x412aa2[_0x5c9c87(0x254)]!=='')&&(_0x5c9c87(0x41d)!==_0x5c9c87(0x41d)?(this['_item']=_0x5740bc,this[_0x5c9c87(0x253)][_0x5c9c87(0x319)](),this[_0x5c9c87(0x2f4)]['clear'](),this[_0x5c9c87(0x416)](_0x238f31)):(this[_0x5c9c87(0x383)]=new Sprite(ImageManager['loadTitle1'](_0x412aa2['BgFilename1'])),this[_0x5c9c87(0x3af)]=new Sprite(ImageManager['loadTitle2'](_0x412aa2[_0x5c9c87(0x254)])),this[_0x5c9c87(0x1e5)](this[_0x5c9c87(0x383)]),this[_0x5c9c87(0x1e5)](this[_0x5c9c87(0x3af)]),this['_backSprite1'][_0x5c9c87(0x3c5)][_0x5c9c87(0x2fc)](this[_0x5c9c87(0x43c)][_0x5c9c87(0x486)](this,this[_0x5c9c87(0x383)])),this[_0x5c9c87(0x3af)][_0x5c9c87(0x3c5)][_0x5c9c87(0x2fc)](this[_0x5c9c87(0x43c)][_0x5c9c87(0x486)](this,this[_0x5c9c87(0x3af)]))));},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x43c)]=function(_0x5cd046){const _0x6f4885=_0x4ff796;this[_0x6f4885(0x356)](_0x5cd046),this['centerSprite'](_0x5cd046);},Scene_ItemCrafting[_0x4ff796(0x2f5)]['startAnimation']=function(){const _0x49b3f6=_0x4ff796;this[_0x49b3f6(0x2e2)]=!![],this[_0x49b3f6(0x48b)]=0x14,this[_0x49b3f6(0x3cc)][_0x49b3f6(0x218)]=VisuMZ['ItemCraftingSys'][_0x49b3f6(0x454)][_0x49b3f6(0x3c2)][_0x49b3f6(0x397)]||![],this[_0x49b3f6(0x436)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x436)]=function(){const _0x535e8f=_0x4ff796;this['_itemSprite']=new Sprite(),this['addChild'](this[_0x535e8f(0x490)]),this[_0x535e8f(0x28f)](),this['setItemSpriteFrame'](),this[_0x535e8f(0x297)](),this[_0x535e8f(0x1f4)](),this[_0x535e8f(0x209)](),this[_0x535e8f(0x2da)](this[_0x535e8f(0x33b)][_0x535e8f(0x39c)]());},Scene_ItemCrafting['prototype'][_0x4ff796(0x28f)]=function(){const _0x4a1e77=_0x4ff796,_0x1d3334=VisuMZ['ItemCraftingSys'][_0x4a1e77(0x37a)],_0x509195=this['_item'][_0x4a1e77(0x24b)];this['_craftPicture']='';if(_0x509195[_0x4a1e77(0x48c)](_0x1d3334['craftPicture']))_0x4a1e77(0x325)===_0x4a1e77(0x30d)?this[_0x4a1e77(0x232)]():this[_0x4a1e77(0x30e)]=String(RegExp['$1']);else _0x509195[_0x4a1e77(0x48c)](_0x1d3334[_0x4a1e77(0x3ea)])&&(this[_0x4a1e77(0x30e)]=String(RegExp['$1']));this['_iconSprite']=new Sprite();this[_0x4a1e77(0x30e)]?this['_iconSprite'][_0x4a1e77(0x3c5)]=ImageManager[_0x4a1e77(0x38e)](this['_craftPicture']):_0x4a1e77(0x23e)===_0x4a1e77(0x23e)?(this[_0x4a1e77(0x2e3)]['bitmap']=ImageManager[_0x4a1e77(0x3d1)](_0x4a1e77(0x2bb)),this[_0x4a1e77(0x2e3)][_0x4a1e77(0x3c5)][_0x4a1e77(0x392)]=![]):(this[_0x4a1e77(0x399)]=[],this[_0x4a1e77(0x3f9)]=[],this[_0x4a1e77(0x23d)]=[],this['_ingredientIndex']=0x0);this['_iconSprite'][_0x4a1e77(0x2dd)]['x']=0.5,this[_0x4a1e77(0x2e3)]['anchor']['y']=0.5;if(!this[_0x4a1e77(0x30e)]){const _0x3de3a6=VisuMZ[_0x4a1e77(0x367)]['Settings'][_0x4a1e77(0x3c2)][_0x4a1e77(0x2f6)]||0x8;this[_0x4a1e77(0x2e3)][_0x4a1e77(0x425)]['x']=_0x3de3a6,this[_0x4a1e77(0x2e3)]['scale']['y']=_0x3de3a6;}this[_0x4a1e77(0x490)][_0x4a1e77(0x1e5)](this[_0x4a1e77(0x2e3)]);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x2c5)]=function(){const _0x2bf815=_0x4ff796;if(this['_craftPicture'])return;const _0x55eae0=this[_0x2bf815(0x21b)],_0xb81dee=_0x55eae0[_0x2bf815(0x47a)],_0x293fa6=ImageManager[_0x2bf815(0x1f9)],_0x41821b=ImageManager[_0x2bf815(0x414)],_0x1e4050=_0xb81dee%0x10*_0x293fa6,_0x349e79=Math[_0x2bf815(0x2e9)](_0xb81dee/0x10)*_0x41821b;this['_iconSprite']['setFrame'](_0x1e4050,_0x349e79,_0x293fa6,_0x41821b);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x297)]=function(){const _0x1caf2e=_0x4ff796;this[_0x1caf2e(0x490)]['x']=Math['round'](Graphics[_0x1caf2e(0x3f0)]/0x2);const _0x43c8fc=Math[_0x1caf2e(0x445)](ImageManager[_0x1caf2e(0x414)]*this[_0x1caf2e(0x490)][_0x1caf2e(0x425)]['y']);this['_itemSprite']['y']=Math[_0x1caf2e(0x445)]((Graphics[_0x1caf2e(0x26d)]+_0x43c8fc)/0x2);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x1f4)]=function(){const _0x110a06=_0x4ff796;this[_0x110a06(0x302)]=VisuMZ[_0x110a06(0x367)]['Settings'][_0x110a06(0x3c2)]['FadeSpeed']||0x1;if(this[_0x110a06(0x21b)][_0x110a06(0x24b)][_0x110a06(0x48c)](VisuMZ['ItemCraftingSys'][_0x110a06(0x37a)][_0x110a06(0x258)])){if(_0x110a06(0x434)!==_0x110a06(0x38c))this[_0x110a06(0x302)]=Math['max'](Number(RegExp['$1']),0x1);else return!!this[_0x110a06(0x483)](_0x2ffdc4);}this[_0x110a06(0x490)]['opacity']=0x0;},Scene_ItemCrafting['prototype']['createAnimationIDs']=function(){const _0x18b26c=_0x4ff796;this['_animationIDs']=[],this[_0x18b26c(0x21b)][_0x18b26c(0x24b)][_0x18b26c(0x48c)](VisuMZ['ItemCraftingSys'][_0x18b26c(0x37a)]['animationIDs'])?'ifmZw'!==_0x18b26c(0x34a)?(this[_0x18b26c(0x2e2)]=!![],this[_0x18b26c(0x48b)]=0x14,this['_windowLayer'][_0x18b26c(0x218)]=_0x5bbfaa[_0x18b26c(0x367)][_0x18b26c(0x454)][_0x18b26c(0x3c2)][_0x18b26c(0x397)]||![],this[_0x18b26c(0x436)]()):this['_animationIDs']=RegExp['$1'][_0x18b26c(0x41e)](',')[_0x18b26c(0x43a)](_0x3984b2=>Number(_0x3984b2)):this[_0x18b26c(0x33b)]=this[_0x18b26c(0x33b)][_0x18b26c(0x3bc)](VisuMZ['ItemCraftingSys'][_0x18b26c(0x454)][_0x18b26c(0x3c2)]['Animations']);},Scene_ItemCrafting['prototype'][_0x4ff796(0x2da)]=function(_0xf48b12){const _0x3d404e=_0x4ff796,_0x284c2b=$dataAnimations[_0xf48b12];if(!_0x284c2b)return;const _0x4d5723=this['isMVAnimation'](_0x284c2b);this[_0x3d404e(0x2ea)]=new(_0x4d5723?Sprite_AnimationMV:Sprite_Animation)();const _0x36630d=[this[_0x3d404e(0x490)]],_0x267cd5=0x0;this[_0x3d404e(0x2ea)][_0x3d404e(0x371)](_0x36630d,_0x284c2b,![],_0x267cd5,null),this[_0x3d404e(0x1e5)](this[_0x3d404e(0x2ea)]);},Scene_ItemCrafting[_0x4ff796(0x2f5)]['isMVAnimation']=function(_0x51fac4){const _0x1f587e=_0x4ff796;return!!_0x51fac4[_0x1f587e(0x2c1)];},Scene_ItemCrafting['prototype'][_0x4ff796(0x1f0)]=function(){const _0x44db9c=_0x4ff796;if(!this[_0x44db9c(0x2e2)])return;this[_0x44db9c(0x48a)](),this[_0x44db9c(0x426)](),this['isFinishedAnimating']()&&this[_0x44db9c(0x27e)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)]['updateItemSpriteOpacity']=function(){const _0x3ca2ef=_0x4ff796;this[_0x3ca2ef(0x490)][_0x3ca2ef(0x1f3)]+=this['_itemSpriteOpacitySpeed'];},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x426)]=function(){const _0x11182b=_0x4ff796;if(!this[_0x11182b(0x2ea)])return;if(this['_animationSprite'][_0x11182b(0x33f)]())return;this['destroyAnimationSprite'](),this[_0x11182b(0x2da)](this[_0x11182b(0x33b)]['shift']());},Scene_ItemCrafting['prototype'][_0x4ff796(0x299)]=function(){const _0x1f720f=_0x4ff796;if(!this[_0x1f720f(0x2ea)])return;this['removeChild'](this[_0x1f720f(0x2ea)]),this['_animationSprite'][_0x1f720f(0x24a)](),this[_0x1f720f(0x2ea)]=undefined;},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x3b2)]=function(){const _0x2301d4=_0x4ff796;if(!this['_itemSprite'])return;this[_0x2301d4(0x3f6)](this[_0x2301d4(0x490)]),this[_0x2301d4(0x490)][_0x2301d4(0x24a)](),this[_0x2301d4(0x490)]=undefined;},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x45f)]=function(){const _0x38e141=_0x4ff796;if(TouchInput[_0x38e141(0x235)]())return!![];if(Input[_0x38e141(0x48d)]('ok'))return!![];if(Input[_0x38e141(0x48d)](_0x38e141(0x2d2)))return!![];if(this['_itemSprite'][_0x38e141(0x1f3)]<0xff)return![];if(this[_0x38e141(0x2ea)])return![];return this[_0x38e141(0x48b)]--<=0x0;},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x27e)]=function(){const _0x1615bd=_0x4ff796;this[_0x1615bd(0x299)](),this[_0x1615bd(0x3b2)](),this[_0x1615bd(0x40f)](),TouchInput[_0x1615bd(0x319)](),Input[_0x1615bd(0x319)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x400)]=function(){const _0x547398=_0x4ff796;Scene_Item['prototype'][_0x547398(0x400)]['call'](this);if($gameSystem[_0x547398(0x45b)])return;$gameTemp[_0x547398(0x42d)]();},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x2ac)]=function(){const _0x2036b3=_0x4ff796;if(!SceneManager['isSceneItemCrafting']())return;const _0x5f19c8=VisuMZ[_0x2036b3(0x367)][_0x2036b3(0x454)][_0x2036b3(0x2d6)];_0x5f19c8[_0x2036b3(0x421)]&&$gameSwitches['setValue'](_0x5f19c8[_0x2036b3(0x421)],![]);},Scene_ItemCrafting[_0x4ff796(0x2f5)]['enableCraftingSwitches']=function(){const _0x4541ba=_0x4ff796;if(!SceneManager[_0x4541ba(0x441)]())return;const _0x4aebce=VisuMZ[_0x4541ba(0x367)]['Settings'][_0x4541ba(0x2d6)];_0x4aebce[_0x4541ba(0x421)]&&$gameSwitches['setValue'](_0x4aebce[_0x4541ba(0x421)],!![]);},Scene_ItemCrafting[_0x4ff796(0x2f5)][_0x4ff796(0x387)]=function(){const _0x568821=_0x4ff796;if(!Imported[_0x568821(0x3c3)])return![];const _0x258443=this[_0x568821(0x21b)]?this[_0x568821(0x21b)]['note']||'':'',_0x4965bf=VisuMZ['ItemCraftingSys']['RegExp'];if(_0x258443['match'](_0x4965bf['CraftEventOnce'])&&!$gameSystem[_0x568821(0x456)](this[_0x568821(0x21b)])&&this['meetsCraftingCommonEventSwitches'](!![]))return!![];else{if(_0x258443[_0x568821(0x48c)](_0x4965bf[_0x568821(0x42e)])&&this[_0x568821(0x38b)](![]))return!![];}return![];},Scene_ItemCrafting[_0x4ff796(0x2f5)]['meetsCraftingCommonEventSwitches']=function(_0x320b63){const _0x34efa6=_0x4ff796,_0x46a913=this[_0x34efa6(0x21b)]?this['_item'][_0x34efa6(0x24b)]:'',_0x289f84=VisuMZ[_0x34efa6(0x367)]['RegExp'],_0x1740a3=_0x320b63?'CraftOnce':_0x34efa6(0x3b3);if(_0x46a913['match'](_0x289f84[_0x1740a3+_0x34efa6(0x470)])){const _0x5ec10d=RegExp['$1'][_0x34efa6(0x41e)](',')[_0x34efa6(0x43a)](_0x4ce7c0=>Number(_0x4ce7c0));for(const _0x2f6f20 of _0x5ec10d){if($gameSwitches['value'](_0x2f6f20)===![])return![];}}if(_0x46a913[_0x34efa6(0x48c)](_0x289f84[_0x1740a3+_0x34efa6(0x488)])){const _0x4773e9=RegExp['$1'][_0x34efa6(0x41e)](',')[_0x34efa6(0x43a)](_0x1f24bc=>Number(_0x1f24bc));for(const _0x26b163 of _0x4773e9){if($gameSwitches[_0x34efa6(0x243)](_0x26b163)===!![])return!![];}return![];}return!![];},Scene_ItemCrafting['prototype'][_0x4ff796(0x2e4)]=function(){const _0xf30ca5=_0x4ff796,_0x275f52=this[_0xf30ca5(0x21b)]?this['_item'][_0xf30ca5(0x24b)]:'',_0x56c9e6=VisuMZ[_0xf30ca5(0x367)][_0xf30ca5(0x37a)];let _0x56ab73=0x0;if(this['meetsCraftingCommonEventSwitches'](!![])&&_0x275f52[_0xf30ca5(0x48c)](_0x56c9e6[_0xf30ca5(0x2fa)])&&!$gameSystem['hasCraftingEventOccurred'](this['_item']))_0x56ab73=Number(RegExp['$1'])||0x1,$gameSystem['registerCraftingEvent'](this['_item']);else this[_0xf30ca5(0x38b)](![])&&_0x275f52[_0xf30ca5(0x48c)](_0x56c9e6[_0xf30ca5(0x42e)])&&(_0x56ab73=Number(RegExp['$1'])||0x1);if(_0x56ab73<=0x0){this['returnBackToItemWindow']();return;}$gameSystem[_0xf30ca5(0x45b)]=!![],$gameTemp[_0xf30ca5(0x40d)](_0x56ab73),SceneManager[_0xf30ca5(0x475)](Scene_Map);},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x3ca)]=Window_MenuCommand[_0x4ff796(0x2f5)][_0x4ff796(0x3a6)],Window_MenuCommand[_0x4ff796(0x2f5)][_0x4ff796(0x3a6)]=function(){const _0x2d6cae=_0x4ff796;VisuMZ[_0x2d6cae(0x367)]['Window_MenuCommand_addOriginalCommands'][_0x2d6cae(0x247)](this),this['addItemCraftingCommand']();},Window_MenuCommand['prototype'][_0x4ff796(0x291)]=function(){const _0x13a2f1=_0x4ff796;if(!this[_0x13a2f1(0x44c)]())return;if(!this[_0x13a2f1(0x437)]())return;const _0x630c95=TextManager['ItemCraftingMenuCommand'],_0x3214ee=this[_0x13a2f1(0x1e8)]();this[_0x13a2f1(0x362)](_0x630c95,_0x13a2f1(0x485),_0x3214ee);},Window_MenuCommand[_0x4ff796(0x2f5)][_0x4ff796(0x44c)]=function(){const _0x10e7e6=_0x4ff796;return Imported[_0x10e7e6(0x2c8)]?![]:!![];},Window_MenuCommand[_0x4ff796(0x2f5)]['isItemCraftingCommandVisible']=function(){return $gameSystem['isMainMenuItemCraftingVisible']();},Window_MenuCommand[_0x4ff796(0x2f5)][_0x4ff796(0x1e8)]=function(){const _0x15a2f7=_0x4ff796;if(DataManager[_0x15a2f7(0x42a)]()[_0x15a2f7(0x25e)]<=0x0)return![];return $gameSystem[_0x15a2f7(0x402)]();},VisuMZ['ItemCraftingSys'][_0x4ff796(0x272)]=Window_ItemCategory['prototype'][_0x4ff796(0x429)],Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x429)]=function(){const _0x38b925=_0x4ff796;if(SceneManager[_0x38b925(0x441)]()){this['addItemCategories']();if(this[_0x38b925(0x310)][_0x38b925(0x25e)]<=0x0){this[_0x38b925(0x398)](),SceneManager[_0x38b925(0x308)]['popScene']();return;}this['createUncategorizedItemCategory']();let _0x422175=this[_0x38b925(0x278)]();if(this[_0x38b925(0x2b2)]){const _0x547ede=this[_0x38b925(0x22e)](this['_lastCraftingExt']);if(_0x547ede>=0x0)_0x422175=_0x547ede;}_0x422175=_0x422175>=this[_0x38b925(0x310)][_0x38b925(0x25e)]?0x0:_0x422175,this[_0x38b925(0x45e)](_0x422175);}else _0x38b925(0x477)!==_0x38b925(0x330)?VisuMZ[_0x38b925(0x367)]['Window_ItemCategory_makeCommandList'][_0x38b925(0x247)](this):this[_0x38b925(0x30b)]={'shown':_0x4c259e['ItemCraftingSys'][_0x38b925(0x454)][_0x38b925(0x419)]['ShowMainMenu'],'enabled':_0x385ddd[_0x38b925(0x367)][_0x38b925(0x454)]['MainMenu'][_0x38b925(0x3ab)]};},Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x28d)]=function(){const _0x18706b=_0x4ff796,_0x59d21f=Window_ItemCategory[_0x18706b(0x3fa)],_0x3effda=DataManager[_0x18706b(0x42a)]()[_0x18706b(0x3a0)](),_0x5a3cbe=[];for(const _0x510605 of _0x59d21f){this[_0x18706b(0x2ab)]=_0x510605[_0x18706b(0x3f2)];for(const _0x13fdcf of _0x3effda){_0x18706b(0x370)!==_0x18706b(0x370)?this['_iconSprite'][_0x18706b(0x3c5)]=_0x4cee3c[_0x18706b(0x38e)](this[_0x18706b(0x30e)]):Window_ItemList[_0x18706b(0x2f5)][_0x18706b(0x24c)][_0x18706b(0x247)](this,_0x13fdcf)&&_0x5a3cbe[_0x18706b(0x2cd)](_0x13fdcf);}}this[_0x18706b(0x2ab)]=null;for(const _0x5431fc of _0x5a3cbe){_0x18706b(0x2a9)==='HcPhF'?_0x3effda[_0x18706b(0x328)](_0x5431fc):_0x343fc8[_0x18706b(0x471)]!==''?this['windowskin']=_0x4a9167[_0x18706b(0x3d1)](_0x128e16[_0x18706b(0x471)]):_0x3402df[_0x18706b(0x2f5)][_0x18706b(0x2bf)][_0x18706b(0x247)](this);}_0x3effda[_0x18706b(0x25e)]>0x0&&(_0x18706b(0x283)!=='hcZpa'?this[_0x18706b(0x398)]():_0x3661d0=_0xe93f81[_0x18706b(0x33d)]),this[_0x18706b(0x2ec)]=_0x3effda;},Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x398)]=function(){const _0x11449b=_0x4ff796,_0x2cf0bb=VisuMZ[_0x11449b(0x367)][_0x11449b(0x454)][_0x11449b(0x2d6)];let _0x49180e=_0x2cf0bb[_0x11449b(0x3ee)]||_0x11449b(0x3ee),_0x390a32=_0x2cf0bb['NoCategoryIcon']||0xa0;_0x49180e=_0x11449b(0x293)[_0x11449b(0x3d7)](_0x390a32,_0x49180e),this[_0x11449b(0x362)](_0x49180e,_0x11449b(0x31c),!![],_0x11449b(0x447));},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x44a)]=Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x440)],Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x440)]=function(_0xa16ccc){const _0x16a66e=_0x4ff796;if(SceneManager[_0x16a66e(0x441)]()&&!this['isItemCraftingCategoryValid'](_0xa16ccc))return;VisuMZ[_0x16a66e(0x367)]['Window_ItemCategory_addItemCategory'][_0x16a66e(0x247)](this,_0xa16ccc);},Window_ItemCategory[_0x4ff796(0x2f5)]['isItemCraftingCategoryValid']=function(_0x28beb1){const _0xe4143e=_0x4ff796,_0x189dd9=DataManager[_0xe4143e(0x42a)](),_0x1d7443=_0x28beb1[_0xe4143e(0x3f2)],_0x3cd659=_0x28beb1['Icon'];this[_0xe4143e(0x2ab)]=_0x1d7443;for(const _0x49871d of _0x189dd9){if(_0xe4143e(0x2ee)!==_0xe4143e(0x415)){if(!_0x49871d)continue;if(Window_ItemList['prototype'][_0xe4143e(0x24c)][_0xe4143e(0x247)](this,_0x49871d)){if(_0xe4143e(0x265)===_0xe4143e(0x265))return this[_0xe4143e(0x2ab)]=null,!![];else{const _0x3bfe4d=_0x22b82b['itemCraftingMask'];return _0x10461(_0x5967cb[_0xe4143e(0x33d)][_0xe4143e(0x25e)]+0x1)[_0xe4143e(0x264)](_0x3bfe4d);}}}else{const _0x5ecb5e=_0x25ab1e(_0x37d796['$1']),_0x380ad6=_0x1350aa[_0xe4143e(0x3dc)](0x1,_0x2f2f94(_0xf694ad['$2'])),_0x170aee=/^\d+$/['test'](_0x5ecb5e),_0x2db611=_0x170aee?_0x5ecb5e:this[_0xe4143e(0x322)](_0x5ecb5e);_0x3bdb71['weapons'][_0x2db611]=_0x380ad6,_0x592b6f=!![];}}return this[_0xe4143e(0x2ab)]=null,![];},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x220)]=Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x26a)],Window_ItemCategory[_0x4ff796(0x2f5)][_0x4ff796(0x26a)]=function(){const _0x1cf830=_0x4ff796;if(SceneManager['isSceneItemCrafting']())return!![];return VisuMZ[_0x1cf830(0x367)]['Window_ItemCategory_needsSelection'][_0x1cf830(0x247)](this);},VisuMZ['ItemCraftingSys'][_0x4ff796(0x417)]=Window_Selectable['prototype']['select'],Window_Selectable[_0x4ff796(0x2f5)][_0x4ff796(0x45e)]=function(_0x580da5){const _0x458025=_0x4ff796;VisuMZ[_0x458025(0x367)][_0x458025(0x417)]['call'](this,_0x580da5);if(this[_0x458025(0x38a)]===Window_ItemCategory&&SceneManager[_0x458025(0x441)]()&&_0x580da5>=0x0){if(_0x458025(0x345)!==_0x458025(0x345))return _0xf642d7[_0x458025(0x3e7)]();else this[_0x458025(0x2b2)]=this[_0x458025(0x350)]()||'';}};function Window_ItemCraftingList(){this['initialize'](...arguments);}Window_ItemCraftingList[_0x4ff796(0x2f5)]=Object['create'](Window_ItemList[_0x4ff796(0x2f5)]),Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x38a)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x4ff796(0x28c)]=VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)][_0x4ff796(0x380)][_0x4ff796(0x2f3)],Window_ItemCraftingList[_0x4ff796(0x3e8)]=VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x454)][_0x4ff796(0x432)][_0x4ff796(0x353)],Window_ItemCraftingList['prototype']['initialize']=function(_0x160a96){const _0x34a758=_0x4ff796;Window_ItemList[_0x34a758(0x2f5)][_0x34a758(0x378)][_0x34a758(0x247)](this,_0x160a96),this[_0x34a758(0x294)]();},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x358)]=function(){return 0x1;},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x231)]=function(){const _0x2325df=_0x4ff796;return Window_Scrollable[_0x2325df(0x2f5)][_0x2325df(0x231)]['call'](this)*0x3+0x8;},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x47c)]=function(_0x3c56a9){return!![];},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x382)]=function(){const _0x540a7c=_0x4ff796;this[_0x540a7c(0x1e6)]=DataManager[_0x540a7c(0x42a)]()['filter'](_0x22edb8=>this[_0x540a7c(0x24c)](_0x22edb8));const _0x43b05c=this[_0x540a7c(0x1e6)][_0x540a7c(0x43a)](_0x3ccdda=>DataManager[_0x540a7c(0x32f)](_0x3ccdda)[_0x540a7c(0x25e)]);this[_0x540a7c(0x23b)]=Math[_0x540a7c(0x3dc)](..._0x43b05c)+0x1;},Window_ItemCraftingList[_0x4ff796(0x2f5)]['includes']=function(_0x505a13){const _0x1304a0=_0x4ff796;if(this['_category']===_0x1304a0(0x447)){const _0x8192fa=SceneManager[_0x1304a0(0x308)];if(_0x8192fa&&_0x8192fa['_categoryWindow']&&_0x8192fa[_0x1304a0(0x480)][_0x1304a0(0x2ec)])return _0x8192fa['_categoryWindow'][_0x1304a0(0x2ec)][_0x1304a0(0x24c)](_0x505a13);}return Window_ItemList[_0x1304a0(0x2f5)]['includes'][_0x1304a0(0x247)](this,_0x505a13);},Window_ItemCraftingList[_0x4ff796(0x2f5)]['selectLast']=function(){},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x314)]=function(_0x1b3bfd){const _0x4e9f6c=_0x4ff796,_0x53724a=this[_0x4e9f6c(0x22d)](_0x1b3bfd);if(!_0x53724a)return;const _0x30aa59=this['itemRectWithPadding'](_0x1b3bfd);this[_0x4e9f6c(0x31d)](),this[_0x4e9f6c(0x2cc)](_0x30aa59,0x2),this['drawBigItemImage'](_0x1b3bfd,_0x53724a,_0x30aa59),this[_0x4e9f6c(0x3d9)](_0x53724a,_0x30aa59),this[_0x4e9f6c(0x2ad)](_0x53724a,_0x30aa59),this[_0x4e9f6c(0x1ec)](_0x53724a,_0x30aa59);},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x2cc)]=function(_0x1ba36e,_0x45e924){const _0x2a966d=_0x4ff796;_0x45e924=_0x45e924||0x1,this[_0x2a966d(0x306)](![]);const _0xf48173=ColorManager[_0x2a966d(0x479)](),_0x5e8db3=ColorManager[_0x2a966d(0x2d4)](),_0x2a98f8=_0x1ba36e[_0x2a966d(0x3f0)]/0x2,_0x4c3ac2=this[_0x2a966d(0x39a)]();while(_0x45e924--){this[_0x2a966d(0x253)][_0x2a966d(0x263)](_0x1ba36e['x'],_0x1ba36e['y'],_0x2a98f8,_0x4c3ac2,_0x5e8db3,_0xf48173),this['contents']['gradientFillRect'](_0x1ba36e['x']+_0x2a98f8,_0x1ba36e['y'],_0x2a98f8,_0x4c3ac2,_0xf48173,_0x5e8db3);}this['changePaintOpacity'](!![]);},Window_Base[_0x4ff796(0x2f5)][_0x4ff796(0x2ad)]=function(_0x2d0f22,_0x305f15){const _0x46d72e=_0x4ff796;let _0x388398=_0x2d0f22[_0x46d72e(0x33d)],_0x32eafd=_0x305f15[_0x46d72e(0x26d)]+this[_0x46d72e(0x3b8)]()*0x2,_0x55b8b8=_0x305f15['y'],_0x3fb5e0=_0x305f15[_0x46d72e(0x3f0)]-_0x32eafd-this[_0x46d72e(0x3b8)]()-ImageManager[_0x46d72e(0x1f9)];DataManager[_0x46d72e(0x25b)](_0x2d0f22)&&(_0x388398=VisuMZ['ItemCraftingSys']['maskItemName'](_0x2d0f22),this[_0x46d72e(0x253)][_0x46d72e(0x212)]=Window_ItemCraftingList['maskItalics']),this[_0x46d72e(0x307)](_0x388398,_0x32eafd,_0x55b8b8,_0x3fb5e0,_0x46d72e(0x40a)),this['contents'][_0x46d72e(0x212)]=![];},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x3f7)]=function(_0x307b88){const _0x181b5e=_0x4ff796;if(DataManager[_0x181b5e(0x249)]){if(_0x181b5e(0x38d)===_0x181b5e(0x38d))_0x307b88=DataManager[_0x181b5e(0x249)](_0x307b88);else return _0x4e09bd['ItemCraftingSys'][_0x181b5e(0x454)][_0x181b5e(0x2ae)][_0x181b5e(0x2d7)];}if(_0x307b88[_0x181b5e(0x24b)][_0x181b5e(0x48c)](VisuMZ['ItemCraftingSys'][_0x181b5e(0x37a)][_0x181b5e(0x259)]))return'eVjrV'===_0x181b5e(0x331)?this[_0x181b5e(0x280)]():String(RegExp['$1']);else{if(_0x181b5e(0x2ef)!==_0x181b5e(0x2ef))this[_0x181b5e(0x41f)](_0x541070)?this[_0x181b5e(0x3de)](_0x365edb):_0x66fff0[_0x181b5e(0x367)][_0x181b5e(0x487)][_0x181b5e(0x247)](this,_0x3c2d35);else{const _0x22d4be=TextManager[_0x181b5e(0x3a5)];return Array(_0x307b88[_0x181b5e(0x33d)][_0x181b5e(0x25e)]+0x1)[_0x181b5e(0x264)](_0x22d4be);}}},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x41c)]=function(_0x345708,_0x5ca242,_0xc5123d){const _0x97dc97=_0x4ff796,_0x38bbaa=VisuMZ[_0x97dc97(0x367)][_0x97dc97(0x37a)],_0x5a99bf=_0x5ca242[_0x97dc97(0x24b)];let _0x17a16f='';if(_0x5a99bf[_0x97dc97(0x48c)](_0x38bbaa['craftPicture']))_0x17a16f=String(RegExp['$1']);else _0x5a99bf[_0x97dc97(0x48c)](_0x38bbaa[_0x97dc97(0x3ea)])&&(_0x97dc97(0x3ff)===_0x97dc97(0x3ff)?_0x17a16f=String(RegExp['$1']):this[_0x97dc97(0x303)]());if(_0x17a16f){const _0x1b01e0=ImageManager[_0x97dc97(0x38e)](_0x17a16f);_0x1b01e0[_0x97dc97(0x2fc)](this['drawPicture'][_0x97dc97(0x486)](this,_0x345708,_0x1b01e0));}else this[_0x97dc97(0x2c6)](_0x5ca242,_0xc5123d);},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x2eb)]=function(_0x5a8f4d,_0x1a8238){const _0xe3d325=_0x4ff796,_0x34eaae=this['itemRectWithPadding'](_0x5a8f4d);let _0x14c0e7=_0x34eaae['x']+this['itemPadding'](),_0x4cb861=_0x34eaae['y']+0x4,_0x333319=_0x34eaae['width']-this['itemPadding']()*0x2,_0x87fe8=_0x34eaae[_0xe3d325(0x26d)]-0x8,_0x523711=Math[_0xe3d325(0x20b)](_0x333319,_0x87fe8);const _0x13fbea=_0x523711/_0x1a8238[_0xe3d325(0x3f0)],_0x4de5ea=_0x523711/_0x1a8238['height'],_0x4f6ac6=Math[_0xe3d325(0x20b)](_0x13fbea,_0x4de5ea,0x1);let _0x1fac1a=Math[_0xe3d325(0x445)](_0x1a8238[_0xe3d325(0x3f0)]*_0x4f6ac6),_0x430fdc=Math[_0xe3d325(0x445)](_0x1a8238['height']*_0x4f6ac6);_0x14c0e7+=Math[_0xe3d325(0x445)]((_0x523711-_0x1fac1a)/0x2),_0x4cb861+=Math['round']((_0x523711-_0x430fdc)/0x2);const _0x2f1991=_0x1a8238[_0xe3d325(0x3f0)],_0x33e3c3=_0x1a8238['height'];this[_0xe3d325(0x253)][_0xe3d325(0x407)][_0xe3d325(0x2e1)]=!![],this['contents'][_0xe3d325(0x22b)](_0x1a8238,0x0,0x0,_0x2f1991,_0x33e3c3,_0x14c0e7,_0x4cb861,_0x1fac1a,_0x430fdc),this['contents'][_0xe3d325(0x407)][_0xe3d325(0x2e1)]=!![];},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x2c6)]=function(_0x3d489e,_0x32048e){const _0x5b78e3=_0x4ff796,_0x1dd807=_0x3d489e[_0x5b78e3(0x47a)];let _0x40f94b=_0x32048e['x']+this[_0x5b78e3(0x3b8)](),_0x243956=_0x32048e['y']+0x4,_0xa1d9c4=_0x32048e['width']-this['itemPadding']()*0x2,_0x568967=_0x32048e['height']-0x8,_0x1d404b=Math[_0x5b78e3(0x20b)](_0xa1d9c4,_0x568967);_0x1d404b=Math[_0x5b78e3(0x2e9)](_0x1d404b/ImageManager[_0x5b78e3(0x1f9)])*ImageManager[_0x5b78e3(0x1f9)],_0x243956+=(_0x568967-_0x1d404b)/0x2;const _0x4d3591=ImageManager[_0x5b78e3(0x3d1)]('IconSet'),_0xe9ce6a=ImageManager['iconWidth'],_0x1c8342=ImageManager['iconHeight'],_0x1d294f=_0x1dd807%0x10*_0xe9ce6a,_0x4d8093=Math['floor'](_0x1dd807/0x10)*_0x1c8342;this[_0x5b78e3(0x253)][_0x5b78e3(0x407)]['imageSmoothingEnabled']=![],this[_0x5b78e3(0x253)][_0x5b78e3(0x22b)](_0x4d3591,_0x1d294f,_0x4d8093,_0xe9ce6a,_0x1c8342,_0x40f94b,_0x243956,_0x1d404b,_0x1d404b),this[_0x5b78e3(0x253)]['_context'][_0x5b78e3(0x2e1)]=!![];},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x3d9)]=function(_0x2b9eba,_0x1f2aa2){const _0x16182a=_0x4ff796;if(!$gameSystem[_0x16182a(0x3fd)](_0x2b9eba))return;const _0x37c1f7=ImageManager[_0x16182a(0x2ce)];let _0x5657ef=_0x1f2aa2['x']+_0x1f2aa2['width']-ImageManager[_0x16182a(0x1f9)],_0x56e003=_0x1f2aa2['y']+0x2;this[_0x16182a(0x3bd)](_0x37c1f7,_0x5657ef,_0x56e003);},Window_ItemCraftingList['prototype'][_0x4ff796(0x1ec)]=function(_0x2bea10,_0x5e131d){const _0x339145=_0x4ff796,_0x509831=DataManager[_0x339145(0x32f)](_0x2bea10);let _0x199dc3=_0x5e131d['height']+this[_0x339145(0x3b8)]()*0x2,_0x242b64=_0x5e131d['y']+Math[_0x339145(0x445)](this[_0x339145(0x39a)]()*1.2),_0x4e8987=_0x5e131d['width']-_0x199dc3-this[_0x339145(0x3b8)](),_0x323fc3=Math[_0x339145(0x2e9)](_0x4e8987/this[_0x339145(0x23b)]),_0x1d7a53=!![];for(const _0x28e601 of _0x509831){if(_0x339145(0x1ef)!==_0x339145(0x1ef)){this['_data']=_0x3ad784[_0x339145(0x42a)]()[_0x339145(0x2a0)](_0x52fcc8=>this['includes'](_0x52fcc8));const _0x469fac=this[_0x339145(0x1e6)]['map'](_0x38b298=>_0x2af937[_0x339145(0x32f)](_0x38b298)[_0x339145(0x25e)]);this['_maxIngredientsSize']=_0x4eeed8['max'](..._0x469fac)+0x1;}else{if(!_0x1d7a53){if(_0x339145(0x26f)===_0x339145(0x26f)){let _0x188ae3=TextManager['itemCraftingIngredientsBridge'],_0x2d7de6=_0x5e131d['y']+(_0x5e131d['height']-this[_0x339145(0x39a)]()*1.5);this[_0x339145(0x307)](_0x188ae3,_0x199dc3,_0x2d7de6,_0x323fc3,_0x339145(0x30a));}else return _0xc09c63[_0x339145(0x2e5)][_0x4a92ef];}_0x199dc3+=_0x323fc3;const _0x22fcc9=_0x28e601[0x0],_0x2fe9f3=_0x28e601[0x1],_0x1e97ea=_0x22fcc9===_0x339145(0x3aa)?$gameParty[_0x339145(0x3aa)]():$gameParty['numItems'](_0x22fcc9);if(_0x22fcc9===_0x339145(0x3aa))this[_0x339145(0x2f1)](_0x2fe9f3,_0x1e97ea,_0x199dc3,_0x242b64,_0x323fc3);else typeof _0x22fcc9==='string'&&_0x22fcc9[_0x339145(0x48c)](/CATEGORY/i)?this[_0x339145(0x29f)](_0x22fcc9,_0x2fe9f3,_0x199dc3,_0x242b64,_0x323fc3):this['drawIngredientItem'](_0x22fcc9,_0x2fe9f3,_0x1e97ea,_0x199dc3,_0x242b64,_0x323fc3);this['resetFontSettings'](),_0x1d7a53=![];}}},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x2f1)]=function(_0x2aa73d,_0x432603,_0x1e31bc,_0x4fe649,_0xd36e2b){const _0x41841e=_0x4ff796;if(Imported[_0x41841e(0x20c)]){let _0x148a59=_0x1e31bc-Math[_0x41841e(0x445)](ImageManager['iconWidth']/0x2),_0xb59237=_0x4fe649+Math[_0x41841e(0x445)]((this[_0x41841e(0x39a)]()-ImageManager[_0x41841e(0x414)])/0x2);const _0x3d0a4b=VisuMZ['CoreEngine']?VisuMZ['CoreEngine'][_0x41841e(0x454)][_0x41841e(0x3b4)][_0x41841e(0x3b7)]:0x0;this[_0x41841e(0x3bd)](_0x3d0a4b,_0x148a59,_0xb59237);}else{if(_0x41841e(0x221)==='UuJqR'){const _0x4e24e0=_0x20c2de(_0x35c0d9['$1']),_0x1aff8d=_0x57f72a[_0x41841e(0x3dc)](0x1,_0xc56966(_0x5d054e['$2'])),_0x2bd627=/^\d+$/['test'](_0x4e24e0),_0x34d7e5=_0x2bd627?_0x4e24e0:this[_0x41841e(0x42c)](_0x4e24e0);_0x27e485[_0x41841e(0x351)][_0x34d7e5]=_0x1aff8d,_0x185da2=!![];}else{let _0x51ae88=_0x1e31bc-Math['round'](_0xd36e2b/0x2),_0x5555de=_0x4fe649+Math[_0x41841e(0x445)]((this['lineHeight']()-ImageManager[_0x41841e(0x414)])/0x2);this['changeTextColor'](ColorManager[_0x41841e(0x42b)]()),this[_0x41841e(0x250)](),this[_0x41841e(0x307)](TextManager[_0x41841e(0x41a)],_0x51ae88,_0x5555de,_0xd36e2b,'center'),this[_0x41841e(0x31d)]();}}let _0x5b15a5=_0x1e31bc-Math[_0x41841e(0x445)](_0xd36e2b/0x2),_0x3af3d8=_0x4fe649+this['lineHeight']();const _0x187738=VisuMZ[_0x41841e(0x202)][_0x41841e(0x454)][_0x41841e(0x349)][_0x41841e(0x281)];let _0x3a3834=_0x187738[_0x41841e(0x3d7)](_0x2aa73d);_0x2aa73d>_0x432603&&this[_0x41841e(0x385)](ColorManager[_0x41841e(0x427)]()),this[_0x41841e(0x253)][_0x41841e(0x478)]=Window_ItemCraftingList[_0x41841e(0x28c)],this[_0x41841e(0x307)](_0x3a3834,_0x5b15a5,_0x3af3d8,_0xd36e2b,_0x41841e(0x30a));},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x29f)]=function(_0x4bd3cc,_0xbc32e8,_0x4d9377,_0x46de22,_0x3d399e){const _0x4b3ae3=_0x4ff796,_0x154429=VisuMZ[_0x4b3ae3(0x367)][_0x4b3ae3(0x454)][_0x4b3ae3(0x2d6)];let _0x2b70a8=_0x4d9377-Math[_0x4b3ae3(0x445)](ImageManager['iconWidth']/0x2),_0xb87c5=_0x46de22+Math[_0x4b3ae3(0x445)]((this[_0x4b3ae3(0x39a)]()-ImageManager[_0x4b3ae3(0x414)])/0x2);this[_0x4b3ae3(0x3bd)](_0x154429['CategoryIcon'],_0x2b70a8,_0xb87c5),_0x4bd3cc[_0x4b3ae3(0x48c)](/CATEGORY: (.*)/i);const _0x26f0d5=String(RegExp['$1'])[_0x4b3ae3(0x2b5)]();let _0x316959=_0x4d9377-Math[_0x4b3ae3(0x445)](_0x3d399e/0x2),_0x53e1c9=_0x46de22;this[_0x4b3ae3(0x253)]['fontSize']=Window_ItemCraftingList['quantityFontSize'],this[_0x4b3ae3(0x307)](_0x26f0d5,_0x316959,_0x53e1c9,_0x3d399e,_0x4b3ae3(0x30a));let _0x563626=_0x4d9377-Math[_0x4b3ae3(0x445)](_0x3d399e/0x2),_0x3039ea=_0x46de22+this[_0x4b3ae3(0x39a)]();const _0x17cf2f=VisuMZ['ItemsEquipsCore'][_0x4b3ae3(0x454)][_0x4b3ae3(0x349)][_0x4b3ae3(0x281)];let _0x280bb1=_0x17cf2f[_0x4b3ae3(0x3d7)](_0xbc32e8);this[_0x4b3ae3(0x253)][_0x4b3ae3(0x478)]=Window_ItemCraftingList[_0x4b3ae3(0x28c)],this['drawText'](_0x280bb1,_0x563626,_0x3039ea,_0x3d399e,_0x4b3ae3(0x30a));},Window_ItemCraftingList['prototype'][_0x4ff796(0x22c)]=function(_0x5b0ece,_0x3b1e01,_0x3fb128,_0xe0dc9c,_0x865fc0,_0x3230b4){const _0x42ee6b=_0x4ff796;let _0x1fc474=_0xe0dc9c-Math[_0x42ee6b(0x445)](ImageManager[_0x42ee6b(0x1f9)]/0x2),_0x3de14b=_0x865fc0+Math[_0x42ee6b(0x445)]((this[_0x42ee6b(0x39a)]()-ImageManager[_0x42ee6b(0x414)])/0x2);this['drawIcon'](_0x5b0ece['iconIndex'],_0x1fc474,_0x3de14b);let _0x2228a7=_0xe0dc9c-Math['round'](_0x3230b4/0x2),_0xf0682e=_0x865fc0+this[_0x42ee6b(0x39a)]();const _0x1d0725=VisuMZ[_0x42ee6b(0x202)][_0x42ee6b(0x454)][_0x42ee6b(0x349)]['ItemQuantityFmt'];let _0x362ced=_0x1d0725['format'](_0x42ee6b(0x44d)[_0x42ee6b(0x3d7)](_0x3fb128,_0x3b1e01));_0x3b1e01>_0x3fb128&&this[_0x42ee6b(0x385)](ColorManager[_0x42ee6b(0x427)]()),this[_0x42ee6b(0x253)][_0x42ee6b(0x478)]=Window_ItemCraftingList[_0x42ee6b(0x28c)],this[_0x42ee6b(0x307)](_0x362ced,_0x2228a7,_0xf0682e,_0x3230b4,_0x42ee6b(0x30a));},Window_ItemCraftingList['prototype'][_0x4ff796(0x294)]=function(){const _0x113cd8=_0x4ff796;if(!VisuMZ[_0x113cd8(0x367)][_0x113cd8(0x454)][_0x113cd8(0x380)][_0x113cd8(0x47d)])return;const _0x234b79=new Rectangle(0x0,0x0,Graphics[_0x113cd8(0x338)],Window_Base['prototype'][_0x113cd8(0x28b)](0x1));this[_0x113cd8(0x28e)]=new Window_ItemCraftingTooltip(_0x234b79),this[_0x113cd8(0x1e5)](this[_0x113cd8(0x28e)]);},Window_ItemCraftingList['prototype'][_0x4ff796(0x45c)]=function(){const _0x538791=_0x4ff796;Window_ItemList[_0x538791(0x2f5)][_0x538791(0x45c)][_0x538791(0x247)](this),this['updateTooltipWindow']();},Window_ItemCraftingList[_0x4ff796(0x2f5)]['updateTooltipWindow']=function(){const _0x193f94=_0x4ff796;if(!this[_0x193f94(0x28e)])return;this[_0x193f94(0x3d6)]()?this[_0x193f94(0x203)]():this[_0x193f94(0x28e)][_0x193f94(0x2cb)]('');const _0x50a462=new Point(TouchInput['x'],TouchInput['y']),_0x162e9d=this[_0x193f94(0x411)][_0x193f94(0x223)](_0x50a462);this[_0x193f94(0x28e)]['x']=_0x162e9d['x']-this[_0x193f94(0x28e)][_0x193f94(0x3f0)]/0x2,this[_0x193f94(0x28e)]['y']=_0x162e9d['y']-this[_0x193f94(0x28e)][_0x193f94(0x26d)];},Window_ItemCraftingList[_0x4ff796(0x2f5)]['tooltipFrameCheckRequirements']=function(){const _0xf6c43e=_0x4ff796;if(!this[_0xf6c43e(0x327)])return![];if(!this['item']())return![];if(!this[_0xf6c43e(0x321)]())return![];if(this[_0xf6c43e(0x1fe)]()!==this[_0xf6c43e(0x278)]())return![];return!![];},Window_ItemCraftingList[_0x4ff796(0x2f5)][_0x4ff796(0x203)]=function(){const _0x13879d=_0x4ff796,_0x28d7d0=this[_0x13879d(0x31b)](this['index']());$gameTemp[_0x13879d(0x267)]=!![];const _0x686b2a=DataManager[_0x13879d(0x32f)](this[_0x13879d(0x2c0)]());$gameTemp[_0x13879d(0x267)]=![];const _0x1ef62f=new Point(TouchInput['x'],TouchInput['y']),_0x1d179a=this['worldTransform'][_0x13879d(0x223)](_0x1ef62f);let _0x683316=_0x28d7d0[_0x13879d(0x26d)]+this[_0x13879d(0x3b8)]()*0x2,_0x4d8398=_0x28d7d0['y']+this['lineHeight'](),_0x44e0c3=_0x28d7d0[_0x13879d(0x3f0)]-_0x683316-this[_0x13879d(0x3b8)](),_0x2f74b5=Math[_0x13879d(0x2e9)](_0x44e0c3/this['_maxIngredientsSize']);for(const _0x59e977 of _0x686b2a){if('yfVxg'===_0x13879d(0x3f5))this['initialize'](...arguments);else{_0x683316+=_0x2f74b5;const _0x473875=new Rectangle(_0x683316-ImageManager[_0x13879d(0x1f9)],0x0,ImageManager['iconWidth']*0x2,Graphics[_0x13879d(0x3be)]);if(_0x473875[_0x13879d(0x269)](_0x1d179a['x'],_0x1d179a['y'])){let _0x35ae73=_0x59e977[0x0],_0x152e1e='';if(_0x35ae73===_0x13879d(0x3aa))_0x152e1e=TextManager[_0x13879d(0x41a)];else{if(typeof _0x35ae73===_0x13879d(0x292)&&_0x35ae73[_0x13879d(0x48c)](/CATEGORY/i))'eXyFh'!==_0x13879d(0x373)?(_0x35ae73['match'](/CATEGORY: (.*)/i),_0x152e1e=String(RegExp['$1'])['trim']()):_0x567170[_0x13879d(0x2cd)](['gold',_0x42d9b0(_0x2c7ec6['$1'])]);else{if('ssYaK'!=='ssYaK'){const _0x30c5ca=_0x5d879b[_0x13879d(0x308)];if(_0x30c5ca&&_0x30c5ca[_0x13879d(0x480)]&&_0x30c5ca['_categoryWindow']['_nonCategoryItemCraftingItems'])return _0x30c5ca[_0x13879d(0x480)][_0x13879d(0x2ec)][_0x13879d(0x24c)](_0x1f7069);}else _0x152e1e=_0x35ae73[_0x13879d(0x33d)];}}this[_0x13879d(0x28e)][_0x13879d(0x2cb)](_0x152e1e['trim']());return;}}}this[_0x13879d(0x28e)]['setText']('');},Window_ItemCraftingList[_0x4ff796(0x2f5)]['updateHelp']=function(){const _0x26e34b=_0x4ff796,_0x173991=this[_0x26e34b(0x2c0)]()&&DataManager[_0x26e34b(0x25b)](this[_0x26e34b(0x2c0)]())?null:this[_0x26e34b(0x2c0)]();this[_0x26e34b(0x2b1)](_0x173991),this['_statusWindow']&&this[_0x26e34b(0x377)][_0x26e34b(0x38a)]===Window_ShopStatus&&this[_0x26e34b(0x377)][_0x26e34b(0x346)](_0x173991);};function Window_ItemCraftingTooltip(){this['initialize'](...arguments);}Window_ItemCraftingTooltip[_0x4ff796(0x2f5)]=Object['create'](Window_Base[_0x4ff796(0x2f5)]),Window_ItemCraftingTooltip[_0x4ff796(0x2f5)][_0x4ff796(0x38a)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip['tooltipSkin']=VisuMZ['ItemCraftingSys']['Settings']['Window'][_0x4ff796(0x33d)],Window_ItemCraftingTooltip[_0x4ff796(0x2f5)][_0x4ff796(0x378)]=function(_0x19b81b){const _0x267553=_0x4ff796;Window_Base[_0x267553(0x2f5)]['initialize']['call'](this,_0x19b81b),this[_0x267553(0x309)](this[_0x267553(0x408)]()?0x0:0x2),this[_0x267553(0x2cb)]('');},Window_ItemCraftingTooltip[_0x4ff796(0x2f5)]['hasCustomWindowSkin']=function(){return Window_ItemCraftingTooltip['tooltipSkin']!=='';},Window_ItemCraftingTooltip['prototype'][_0x4ff796(0x2bf)]=function(){const _0x116885=_0x4ff796;Window_ItemCraftingTooltip[_0x116885(0x471)]!==''?_0x116885(0x37c)===_0x116885(0x37c)?this[_0x116885(0x366)]=ImageManager[_0x116885(0x3d1)](Window_ItemCraftingTooltip[_0x116885(0x471)]):this[_0x116885(0x200)]!==_0x55ae17&&(this['_text']=_0xbe02e0,this[_0x116885(0x449)]()):Window_Base[_0x116885(0x2f5)][_0x116885(0x2bf)][_0x116885(0x247)](this);},Window_ItemCraftingTooltip[_0x4ff796(0x2f5)]['setText']=function(_0x130f22){const _0x36224f=_0x4ff796;this[_0x36224f(0x200)]!==_0x130f22&&(this[_0x36224f(0x200)]=_0x130f22,this[_0x36224f(0x449)]());},Window_ItemCraftingTooltip[_0x4ff796(0x2f5)][_0x4ff796(0x319)]=function(){const _0x461759=_0x4ff796;this[_0x461759(0x2cb)]('');},Window_ItemCraftingTooltip[_0x4ff796(0x2f5)][_0x4ff796(0x346)]=function(_0x31ddc7){const _0x2b9458=_0x4ff796;this[_0x2b9458(0x2cb)](_0x31ddc7?_0x31ddc7[_0x2b9458(0x33d)]:'');},Window_ItemCraftingTooltip[_0x4ff796(0x2f5)]['refresh']=function(){const _0x2badc6=_0x4ff796,_0x5ce2be=this[_0x2badc6(0x379)]();this[_0x2badc6(0x451)](),this[_0x2badc6(0x307)](this['_text'],0x0,0x0,this[_0x2badc6(0x312)],_0x2badc6(0x30a));},Window_ItemCraftingTooltip[_0x4ff796(0x2f5)][_0x4ff796(0x451)]=function(){const _0x5a16b9=_0x4ff796;if(this[_0x5a16b9(0x200)]==='')this[_0x5a16b9(0x253)][_0x5a16b9(0x319)](),this['width']=0x0;else{let _0x5cf84b=this[_0x5a16b9(0x2bc)](this[_0x5a16b9(0x200)])+this[_0x5a16b9(0x3b8)]()*0x4;this[_0x5a16b9(0x3f0)]=_0x5cf84b+$gameSystem[_0x5a16b9(0x435)]()*0x2,this[_0x5a16b9(0x21a)]();if(this[_0x5a16b9(0x408)]())return;const _0x1e0924=ColorManager[_0x5a16b9(0x479)]();this['contents'][_0x5a16b9(0x29d)](0x0,0x0,this[_0x5a16b9(0x312)],this['innerHeight'],_0x1e0924);}};function Window_ItemCraftingNumber(){const _0x51fdfa=_0x4ff796;this[_0x51fdfa(0x378)](...arguments);}Window_ItemCraftingNumber['prototype']=Object['create'](Window_ShopNumber[_0x4ff796(0x2f5)]),Window_ItemCraftingNumber[_0x4ff796(0x2f5)]['constructor']=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x378)]=function(_0x258270){const _0x55ab0e=_0x4ff796;Window_ShopNumber[_0x55ab0e(0x2f5)][_0x55ab0e(0x378)][_0x55ab0e(0x247)](this,_0x258270);},Window_ItemCraftingNumber['prototype'][_0x4ff796(0x371)]=function(_0x5d8c93){const _0x1e972f=_0x4ff796;this[_0x1e972f(0x21b)]=_0x5d8c93,this[_0x1e972f(0x277)]=this[_0x1e972f(0x35f)](),this[_0x1e972f(0x424)]=Math[_0x1e972f(0x20b)](0x1,this[_0x1e972f(0x277)]),this['placeButtons'](),this['refresh']();},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x35f)]=function(){const _0xbf88cc=_0x4ff796;if(DataManager[_0xbf88cc(0x3fb)](this[_0xbf88cc(0x21b)])){if(_0xbf88cc(0x3a7)===_0xbf88cc(0x2d8)){if(!_0x58d700[_0xbf88cc(0x46c)])return![];return this['getCraftBatchItems'](_0x138c89)!==null;}else return $gameParty[_0xbf88cc(0x395)](this['_item']);}const _0x53eb00=[],_0x113934=this['_item'],_0x1fa5d6=DataManager[_0xbf88cc(0x32f)](_0x113934);let _0xff70c5=0x0;for(const _0x5ee757 of _0x1fa5d6){if(_0xbf88cc(0x2fb)===_0xbf88cc(0x1f6)){if(!_0x585430[_0xbf88cc(0x441)]())return;const _0x480f27=_0x5828e1[_0xbf88cc(0x367)]['Settings'][_0xbf88cc(0x2d6)];_0x480f27[_0xbf88cc(0x421)]&&_0x3b9ddd[_0xbf88cc(0x343)](_0x480f27[_0xbf88cc(0x421)],![]);}else{if(!_0x5ee757)continue;let _0x23fdf2=_0x5ee757[0x0];const _0x1959af=_0x5ee757[0x1];_0x23fdf2===_0xbf88cc(0x3aa)?_0xbf88cc(0x3d5)==='IJFLI'?(this[_0xbf88cc(0x356)](_0x1e2141),this[_0xbf88cc(0x446)](_0x2efa69)):_0x53eb00[_0xbf88cc(0x2cd)](Math[_0xbf88cc(0x2e9)]($gameParty[_0xbf88cc(0x3aa)]()/_0x1959af)):(typeof _0x23fdf2==='string'&&_0x23fdf2['match'](/CATEGORY/i)&&(_0x23fdf2=SceneManager['_scene'][_0xbf88cc(0x23d)][_0xff70c5],_0xff70c5+=0x1),_0x53eb00[_0xbf88cc(0x2cd)](Math[_0xbf88cc(0x2e9)]($gameParty[_0xbf88cc(0x3df)](_0x23fdf2)/_0x1959af)));}}if(_0x53eb00[_0xbf88cc(0x25e)]<=0x0)_0x53eb00['push'](0x0);return _0x53eb00[_0xbf88cc(0x2cd)]($gameParty['maxItems'](_0x113934)-$gameParty[_0xbf88cc(0x3df)](_0x113934)),Math[_0xbf88cc(0x20b)](..._0x53eb00);},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x449)]=function(){const _0x5be6a8=_0x4ff796;Window_Selectable[_0x5be6a8(0x2f5)][_0x5be6a8(0x449)][_0x5be6a8(0x247)](this),this[_0x5be6a8(0x317)](),this[_0x5be6a8(0x227)](0x0),this[_0x5be6a8(0x34e)](),this['drawHorzLine'](),this[_0x5be6a8(0x390)]();},Window_ItemCraftingNumber[_0x4ff796(0x2f5)]['changeOkButtonEnable']=function(){const _0x4b8637=_0x4ff796,_0x2ab5f2=this[_0x4b8637(0x489)][0x4];if(!_0x2ab5f2)return;if(this['isOkEnabled']()){if(_0x4b8637(0x32b)===_0x4b8637(0x215)){const _0x1f68d2=this[_0x4b8637(0x21b)]?this[_0x4b8637(0x21b)]['note']:'',_0x1c10ad=_0x2e8afb[_0x4b8637(0x367)]['RegExp'];let _0x1997ec=0x0;if(this[_0x4b8637(0x38b)](!![])&&_0x1f68d2[_0x4b8637(0x48c)](_0x1c10ad[_0x4b8637(0x2fa)])&&!_0x20d548['hasCraftingEventOccurred'](this[_0x4b8637(0x21b)]))_0x1997ec=_0x5977c1(_0x5a0d04['$1'])||0x1,_0x39c402['registerCraftingEvent'](this[_0x4b8637(0x21b)]);else this['meetsCraftingCommonEventSwitches'](![])&&_0x1f68d2[_0x4b8637(0x48c)](_0x1c10ad['CraftEventRepeat'])&&(_0x1997ec=_0x386130(_0x3c3717['$1'])||0x1);if(_0x1997ec<=0x0){this[_0x4b8637(0x46e)]();return;}_0x563cd3[_0x4b8637(0x45b)]=!![],_0x13b4e3['reserveCommonEvent'](_0x1997ec),_0x5ea380[_0x4b8637(0x475)](_0x9f5954);}else _0x2ab5f2[_0x4b8637(0x236)](this[_0x4b8637(0x460)][_0x4b8637(0x486)](this));}else _0x2ab5f2[_0x4b8637(0x273)]=null;},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x3d8)]=function(){const _0x134657=_0x4ff796;return Math[_0x134657(0x2e9)](this[_0x134657(0x275)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber['prototype']['totalPriceY']=function(){const _0x3555f6=_0x4ff796;return Math['floor'](this[_0x3555f6(0x274)]-this[_0x3555f6(0x39a)]()*6.5);},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x3a9)]=function(){const _0x307778=_0x4ff796;return Math['floor'](this[_0x307778(0x3d8)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber[_0x4ff796(0x2f5)]['isOkEnabled']=function(){const _0x4cb455=_0x4ff796;if((this[_0x4cb455(0x424)]||0x0)<=0x0)return![];return Window_ShopNumber['prototype'][_0x4cb455(0x43b)][_0x4cb455(0x247)](this);},Window_ItemCraftingNumber['prototype'][_0x4ff796(0x3d3)]=function(){const _0x1608bb=_0x4ff796;return this[_0x1608bb(0x43b)]();},Window_ItemCraftingNumber['prototype'][_0x4ff796(0x34e)]=function(){const _0x276a4c=_0x4ff796,_0x22d7eb=DataManager[_0x276a4c(0x32f)](this[_0x276a4c(0x21b)]);let _0x107970=this['totalPriceY']();_0x107970-=this['lineHeight']()*_0x22d7eb[_0x276a4c(0x25e)],this[_0x276a4c(0x2a6)]=0x0,this['drawCategories'](_0x107970);for(const _0x3253bb of _0x22d7eb){if(_0x276a4c(0x3ec)!==_0x276a4c(0x3ec))this[_0x276a4c(0x48e)](_0x240b64,_0x221107),![]&&_0x2f06fd[_0x276a4c(0x286)](_0x45f6b4[_0x276a4c(0x33d)]+'\x20x'+_0x45289e);else{_0x107970+=this['lineHeight']();if(!_0x3253bb)continue;this[_0x276a4c(0x208)](_0x3253bb,_0x107970);}};},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x27d)]=function(_0x3b28d0){const _0x353333=_0x4ff796,_0x400bef=this[_0x353333(0x3b8)]();let _0x54a24a=_0x400bef*0x2;const _0x396e3e=this['innerWidth']-_0x54a24a-_0x400bef*0x3,_0x594ffe=_0x54a24a+Math[_0x353333(0x473)](_0x396e3e/0x3),_0x299fed=Math[_0x353333(0x2e9)](_0x396e3e*0x2/0x3/0x3),_0x79081f=Math['max'](this[_0x353333(0x2bc)](_0x353333(0x339)),this[_0x353333(0x2bc)](_0x353333(0x211)));this[_0x353333(0x31d)](),this['changeTextColor'](ColorManager[_0x353333(0x42b)]());const _0x463f88=[_0x353333(0x20f),'shift',_0x353333(0x313)];for(let _0xa7f790=0x0;_0xa7f790<0x3;_0xa7f790++){const _0x1d3997=_0x463f88[_0xa7f790],_0x2de4ba=TextManager[_0x353333(0x47b)][_0x1d3997];this['drawText'](_0x2de4ba,_0x594ffe+_0x299fed*_0xa7f790+_0x79081f,_0x3b28d0,_0x299fed-_0x79081f,_0x353333(0x30a));}},Window_ItemCraftingNumber['prototype']['drawMathMarks']=function(_0x558b3b,_0x6abaa0){const _0x4999b1=_0x4ff796,_0x444f04=this[_0x4999b1(0x3b8)]();let _0x62cfad=_0x444f04*0x2;const _0x2bbe3f=this['innerWidth']-_0x62cfad-_0x444f04*0x3,_0x4ac42f=_0x62cfad+Math[_0x4999b1(0x473)](_0x2bbe3f/0x3),_0x3128e2=Math[_0x4999b1(0x2e9)](_0x2bbe3f*0x2/0x3/0x3);_0x6abaa0=_0x4999b1(0x318)[_0x4999b1(0x3d7)](_0x6abaa0),this[_0x4999b1(0x307)](_0x6abaa0,_0x4ac42f+_0x3128e2*0x1,_0x558b3b,_0x3128e2,_0x4999b1(0x40a)),this[_0x4999b1(0x307)]('\x20=',_0x4ac42f+_0x3128e2*0x2,_0x558b3b,_0x3128e2,_0x4999b1(0x40a));},Window_ItemCraftingNumber[_0x4ff796(0x2f5)]['drawIngredients']=function(_0x5417f6,_0x4ae178){const _0x3f3640=_0x4ff796;let _0x1ff3ca=_0x5417f6[0x0];this[_0x3f3640(0x31d)](),this[_0x3f3640(0x35c)](_0x4ae178,'-'),_0x1ff3ca===_0x3f3640(0x3aa)?this['drawGoldIngredient'](_0x5417f6,_0x4ae178,!![]):_0x3f3640(0x241)!==_0x3f3640(0x241)?this[_0x3f3640(0x3d2)]=_0x235a41:this[_0x3f3640(0x29a)](_0x5417f6,_0x4ae178,!![],![]);},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x390)]=function(){const _0xc6ffea=_0x4ff796,_0x4df50f=[this[_0xc6ffea(0x21b)],0x1],_0xd0c10=this['itemNameY'](),_0x53a17c=DataManager[_0xc6ffea(0x25b)](this[_0xc6ffea(0x21b)]);this[_0xc6ffea(0x29a)](_0x4df50f,_0xd0c10,![],_0x53a17c),this['drawMathMarks'](_0xd0c10,'+');},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x2ff)]=function(){return!![];},Window_ItemCraftingNumber['prototype'][_0x4ff796(0x43d)]=function(){return![];},Window_ItemCraftingNumber[_0x4ff796(0x2f5)]['drawGoldIngredient']=function(_0x53a938,_0x54f274,_0x48c969){const _0x3ba993=_0x4ff796,_0x1badf0=this['itemPadding']();let _0x5109d5=_0x1badf0*0x2;const _0x25b72b=this['innerWidth']-_0x5109d5-_0x1badf0*0x3,_0x52fa07=_0x5109d5+Math[_0x3ba993(0x473)](_0x25b72b/0x3),_0x18b62e=Math[_0x3ba993(0x2e9)](_0x25b72b*0x2/0x3/0x3),_0x4ff9d8=Math[_0x3ba993(0x3dc)](this[_0x3ba993(0x2bc)](_0x3ba993(0x339)),this[_0x3ba993(0x2bc)]('\x20=\x20')),_0x538e82=_0x53a938[0x0],_0x4836c4=_0x53a938[0x1],_0x50ae2d=_0x4836c4*this['_number'],_0x4985ea=VisuMZ[_0x3ba993(0x238)]?VisuMZ[_0x3ba993(0x238)][_0x3ba993(0x454)][_0x3ba993(0x3b4)]['GoldIcon']:0x0;if(_0x4985ea>0x0){const _0x1382ab=_0x54f274+(this[_0x3ba993(0x39a)]()-ImageManager[_0x3ba993(0x414)])/0x2;this[_0x3ba993(0x3bd)](_0x4985ea,_0x5109d5,_0x1382ab);const _0xc0ab1a=ImageManager[_0x3ba993(0x1f9)]+0x4;_0x5109d5+=_0xc0ab1a;}this[_0x3ba993(0x385)](ColorManager['systemColor']()),this[_0x3ba993(0x307)](TextManager['currencyUnit'],_0x5109d5,_0x54f274,_0x18b62e,_0x3ba993(0x40a));const _0x2cb923=$gameParty[_0x3ba993(0x3aa)]();this[_0x3ba993(0x216)](_0x2cb923,TextManager['currencyUnit'],_0x52fa07,_0x54f274,_0x18b62e);const _0x2c0954=_0x52fa07+_0x18b62e*0x1+_0x4ff9d8,_0x1d3ce6=_0x18b62e-_0x4ff9d8;this[_0x3ba993(0x216)](_0x50ae2d,TextManager[_0x3ba993(0x41a)],_0x2c0954,_0x54f274,_0x1d3ce6);const _0x1df6bd=_0x52fa07+_0x18b62e*0x2+_0x4ff9d8,_0xfa7b42=_0x18b62e-_0x4ff9d8,_0x5be82b=Math[_0x3ba993(0x20b)](_0x2cb923+_0x50ae2d*(_0x48c969?-0x1:0x1),$gameParty['maxGold']());this[_0x3ba993(0x216)](_0x5be82b,TextManager[_0x3ba993(0x41a)],_0x1df6bd,_0x54f274,_0xfa7b42);},Window_ItemCraftingNumber[_0x4ff796(0x2f5)]['drawItemIngredient']=function(_0x3edc93,_0x338f88,_0x2c677c,_0x5e5263){const _0x4fed35=_0x4ff796,_0x5e7137=this[_0x4fed35(0x3b8)]();let _0x51e890=_0x5e7137*0x2;const _0x1ef20f=this[_0x4fed35(0x312)]-_0x51e890-_0x5e7137*0x3,_0x361867=_0x51e890+Math['ceil'](_0x1ef20f/0x3),_0xa5fea7=Math[_0x4fed35(0x2e9)](_0x1ef20f*0x2/0x3/0x3),_0x2568b3=Math[_0x4fed35(0x3dc)](this['textWidth'](_0x4fed35(0x339)),this[_0x4fed35(0x2bc)](_0x4fed35(0x211)));let _0x2c404c=_0x3edc93[0x0];if(typeof _0x2c404c===_0x4fed35(0x292)&&_0x2c404c[_0x4fed35(0x48c)](/CATEGORY/i)){if(_0x4fed35(0x36e)===_0x4fed35(0x3c1)){this[_0x4fed35(0x398)](),_0x43b72f['_scene'][_0x4fed35(0x2c7)]();return;}else _0x2c404c=SceneManager['_scene'][_0x4fed35(0x23d)][this[_0x4fed35(0x2a6)]],this['_categoryIndex']+=0x1;}const _0x5a5e78=_0x3edc93[0x1],_0x3f33d2=_0x5a5e78*this['_number'];let _0x2dee55=_0x2c404c[_0x4fed35(0x47a)];const _0x4a8f46=_0x2dee55>0x0?ImageManager[_0x4fed35(0x1f9)]+0x4:0x0;if(_0x5e5263){if(_0x4fed35(0x420)===_0x4fed35(0x23f)){if(this[_0x4fed35(0x30b)]===_0x2e4035)this[_0x4fed35(0x376)]();return this[_0x4fed35(0x30b)][_0x4fed35(0x20a)];}else{const _0x4dadad=new Rectangle(_0x51e890,_0x338f88,_0x1ef20f,this[_0x4fed35(0x39a)]());this[_0x4fed35(0x2ad)](_0x2c404c,_0x4dadad),this[_0x4fed35(0x3bd)](_0x2c404c['iconIndex'],_0x4dadad['x'],_0x4dadad['y']);}}else this[_0x4fed35(0x234)](_0x2c404c,_0x51e890,_0x338f88,_0x1ef20f);const _0x3c091e=_0x361867+_0xa5fea7*0x0,_0x3ebc8f=_0xa5fea7-_0x4a8f46,_0x253b72=$gameParty[_0x4fed35(0x3df)](_0x2c404c);this[_0x4fed35(0x307)](_0x253b72,_0x3c091e,_0x338f88,_0x3ebc8f,_0x4fed35(0x459)),this[_0x4fed35(0x3bd)](_0x2dee55,_0x3c091e+_0x3ebc8f+0x4,_0x338f88);const _0x45f5e4=_0x361867+_0xa5fea7*0x1+_0x2568b3,_0x32e2e2=_0xa5fea7-_0x2568b3-_0x4a8f46;this[_0x4fed35(0x307)](_0x3f33d2,_0x45f5e4,_0x338f88,_0x32e2e2,_0x4fed35(0x459)),this[_0x4fed35(0x3bd)](_0x2dee55,_0x45f5e4+_0x32e2e2+0x4,_0x338f88);const _0x5571c6=_0x361867+_0xa5fea7*0x2+_0x2568b3,_0x3adebd=_0xa5fea7-_0x2568b3-_0x4a8f46,_0x117ca3=_0x253b72+_0x3f33d2*(_0x2c677c?-0x1:0x1);this[_0x4fed35(0x307)](_0x117ca3,_0x5571c6,_0x338f88,_0x3adebd,_0x4fed35(0x459)),this[_0x4fed35(0x3bd)](_0x2dee55,_0x5571c6+_0x3adebd+0x4,_0x338f88);},Window_ItemCraftingNumber[_0x4ff796(0x2f5)][_0x4ff796(0x344)]=function(){const _0x4d9e4b=_0x4ff796,_0x8d03c1=this['itemPadding']();let _0x48e5fa=_0x8d03c1*0x2;const _0x3473d5=this[_0x4d9e4b(0x312)]-_0x48e5fa-_0x8d03c1*0x3,_0x576c90=_0x48e5fa+Math[_0x4d9e4b(0x473)](_0x3473d5/0x3),_0x277ba2=this[_0x4d9e4b(0x3d8)](),_0x5acdfa=Math[_0x4d9e4b(0x2e9)](_0x3473d5*0x2/0x3/0x3),_0x446164=Math['max'](this[_0x4d9e4b(0x2bc)](_0x4d9e4b(0x339)),this[_0x4d9e4b(0x2bc)]('\x20=\x20')),_0x3a71b9=this[_0x4d9e4b(0x21b)]?.[_0x4d9e4b(0x47a)]>0x0?ImageManager[_0x4d9e4b(0x1f9)]:0x0,_0x7820e0=this[_0x4d9e4b(0x467)](),_0x3cea84=new Rectangle(Math[_0x4d9e4b(0x2e9)](_0x576c90+_0x5acdfa*0x2-this[_0x4d9e4b(0x467)]()-_0x3a71b9+this[_0x4d9e4b(0x3b8)]()/0x2-0x2),_0x277ba2,this[_0x4d9e4b(0x467)](),this[_0x4d9e4b(0x39a)]());return _0x3cea84;};function Window_ItemCraftingIngredient(){const _0x1105fe=_0x4ff796;this[_0x1105fe(0x378)](...arguments);}Window_ItemCraftingIngredient['prototype']=Object[_0x4ff796(0x23a)](Window_ItemList[_0x4ff796(0x2f5)]),Window_ItemCraftingIngredient[_0x4ff796(0x2f5)][_0x4ff796(0x38a)]=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x4ff796(0x2f5)][_0x4ff796(0x378)]=function(_0x48439a){const _0x238098=_0x4ff796;Window_Selectable[_0x238098(0x2f5)][_0x238098(0x378)][_0x238098(0x247)](this,_0x48439a),this[_0x238098(0x369)]=0x0;},Window_ItemCraftingIngredient[_0x4ff796(0x2f5)][_0x4ff796(0x37f)]=function(){return![];},Window_ItemCraftingIngredient[_0x4ff796(0x2f5)][_0x4ff796(0x371)]=function(_0x5d07cf,_0x29ba50){const _0x141702=_0x4ff796;this['_category']=_0x5d07cf,this['_amount']=_0x29ba50||0x1,this['refresh'](),this[_0x141702(0x3ef)](0x0,0x0),this[_0x141702(0x22a)](),this[_0x141702(0x246)](0x0);},Window_ItemCraftingIngredient[_0x4ff796(0x2f5)]['makeItemList']=function(){const _0x16197f=_0x4ff796;this[_0x16197f(0x1e6)]=$gameParty[_0x16197f(0x422)]()[_0x16197f(0x2a0)](_0xbe8e95=>this[_0x16197f(0x24c)](_0xbe8e95));},Window_ItemCraftingIngredient['prototype'][_0x4ff796(0x24c)]=function(_0x139477){const _0x473e18=_0x4ff796;if(!_0x139477)return![];if(_0x139477===SceneManager['_scene'][_0x473e18(0x21b)])return![];return _0x139477[_0x473e18(0x396)][_0x473e18(0x24c)](this[_0x473e18(0x2ab)]['toUpperCase']()[_0x473e18(0x2b5)]());},Window_ItemCraftingIngredient['prototype'][_0x4ff796(0x47c)]=function(_0x32354a){const _0x24fb3d=_0x4ff796;if(!_0x32354a)return![];if(this[_0x24fb3d(0x2ba)]()[_0x24fb3d(0x24c)](_0x32354a))return![];return $gameParty[_0x24fb3d(0x3df)](_0x32354a)>=this['_amount'];},Window_ItemCraftingIngredient[_0x4ff796(0x2f5)]['selectedIngredientList']=function(){const _0x114f60=_0x4ff796,_0x13c0b0=[],_0x25c062=DataManager[_0x114f60(0x32f)](SceneManager[_0x114f60(0x308)][_0x114f60(0x21b)]);for(const _0x3da330 of _0x25c062){if(_0x114f60(0x401)===_0x114f60(0x401)){if(!_0x3da330)continue;const _0x173a82=_0x3da330[0x0];if(DataManager[_0x114f60(0x30f)](_0x173a82)||DataManager['isWeapon'](_0x173a82)||DataManager[_0x114f60(0x438)](_0x173a82)){if(_0x114f60(0x23c)===_0x114f60(0x23c))_0x13c0b0['push'](_0x173a82);else{const _0x33bd54=this[_0x114f60(0x21b)],_0x142a97=this[_0x114f60(0x1e4)][_0x114f60(0x2e8)]();_0x22d8c1[_0x114f60(0x367)][_0x114f60(0x352)](_0x33bd54,!![]),_0x3c4942[_0x114f60(0x367)][_0x114f60(0x352)](_0x33bd54,![]),this[_0x114f60(0x31f)]();const _0x442d33=_0x4f1d43[_0x114f60(0x32c)](_0x33bd54);_0x3decd6[_0x114f60(0x367)]['JS'][_0x442d33]&&_0x162ea9[_0x114f60(0x367)]['JS'][_0x442d33][_0x114f60(0x247)](this,_0x33bd54,_0x142a97),_0x2af806[_0x114f60(0x367)][_0x114f60(0x454)][_0x114f60(0x2d6)][_0x114f60(0x228)][_0x114f60(0x247)](this,_0x33bd54,_0x142a97);}}}else{if(_0x3cbfb3[_0x114f60(0x243)](_0x1f71e3))return!![];}}return _0x13c0b0[_0x114f60(0x3bc)](SceneManager[_0x114f60(0x308)][_0x114f60(0x23d)]);},Window_ItemCraftingIngredient[_0x4ff796(0x2f5)][_0x4ff796(0x234)]=function(_0x1d4978,_0x4e21fc,_0xaae058,_0x6b2e1c){const _0x56baca=_0x4ff796;_0x1d4978&&this['selectedIngredientList']()['includes'](_0x1d4978)&&(_0x56baca(0x40e)!=='SZAuJ'?(_0x4b23f9['ConvertParams'](_0x5db551,_0x3e12c9),_0x1cade2[_0x56baca(0x3c0)](_0x3f49c1['Show'])):this[_0x56baca(0x2b8)]=!![]),Window_ItemList[_0x56baca(0x2f5)]['drawItemName'][_0x56baca(0x247)](this,_0x1d4978,_0x4e21fc,_0xaae058,_0x6b2e1c),this[_0x56baca(0x2b8)]=![];},Window_ItemCraftingIngredient[_0x4ff796(0x2f5)][_0x4ff796(0x307)]=function(_0x51cd34,_0x1d3b88,_0x39b77b,_0x144386,_0x4375cc){const _0x24ea42=_0x4ff796;if(this[_0x24ea42(0x2b8)]){if('SiVaV'!==_0x24ea42(0x3f8)){if(_0x595a66[_0x24ea42(0x441)]()&&!this[_0x24ea42(0x359)](_0x6a7da9))return;_0x312ba9[_0x24ea42(0x367)][_0x24ea42(0x44a)][_0x24ea42(0x247)](this,_0x5e0654);}else{const _0x16392c=VisuMZ[_0x24ea42(0x367)][_0x24ea42(0x454)][_0x24ea42(0x2d6)];this['contents'][_0x24ea42(0x210)]=ColorManager['getColor'](_0x16392c[_0x24ea42(0x3b0)]),_0x51cd34+=_0x16392c['SelectedText'];}}Window_Base[_0x24ea42(0x2f5)]['drawText'][_0x24ea42(0x247)](this,_0x51cd34,_0x1d3b88,_0x39b77b,_0x144386,_0x4375cc);},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x44f)]=Window_ShopStatus[_0x4ff796(0x2f5)][_0x4ff796(0x449)],Window_ShopStatus[_0x4ff796(0x2f5)][_0x4ff796(0x449)]=function(){const _0x3e7e4a=_0x4ff796;if(this[_0x3e7e4a(0x41f)](this[_0x3e7e4a(0x21b)])){if(_0x3e7e4a(0x2c9)===_0x3e7e4a(0x2c9))this[_0x3e7e4a(0x3de)](this['_item']);else return this[_0x3e7e4a(0x442)]()?this[_0x3e7e4a(0x3da)]():_0x2b48b0['prototype'][_0x3e7e4a(0x36b)]['call'](this);}else _0x3e7e4a(0x33c)!=='LOMhD'?VisuMZ['ItemCraftingSys']['Window_ShopStatus_refresh'][_0x3e7e4a(0x247)](this):(_0x28bcd9=_0x101ee1,_0x207acb=this[_0x3e7e4a(0x42c)](_0x12c140));},VisuMZ[_0x4ff796(0x367)][_0x4ff796(0x487)]=Window_ShopStatus[_0x4ff796(0x2f5)]['setItem'],Window_ShopStatus[_0x4ff796(0x2f5)]['setItem']=function(_0x3f7663){const _0xd4ddfb=_0x4ff796;this[_0xd4ddfb(0x41f)](_0x3f7663)?this[_0xd4ddfb(0x3de)](_0x3f7663):VisuMZ['ItemCraftingSys'][_0xd4ddfb(0x487)]['call'](this,_0x3f7663);},Window_ShopStatus[_0x4ff796(0x2f5)][_0x4ff796(0x41f)]=function(_0x313314){const _0x4aec5e=_0x4ff796;if(!_0x313314)return![];if(!SceneManager[_0x4aec5e(0x441)]())return![];if(Imported['VisuMZ_3_ShopBatches']){if(!Window_ShopStatus['BATCH_CONTENTS'][_0x4aec5e(0x245)])return![];}return DataManager[_0x4aec5e(0x3fb)](_0x313314);},Window_ShopStatus[_0x4ff796(0x2f5)][_0x4ff796(0x3de)]=function(_0xb2086b){const _0x7b4e55=_0x4ff796;this['_item']=_0xb2086b,this[_0x7b4e55(0x253)][_0x7b4e55(0x319)](),this['contentsBack'][_0x7b4e55(0x319)](),this[_0x7b4e55(0x416)](_0xb2086b);},Window_ShopStatus['prototype'][_0x4ff796(0x416)]=function(_0x589c4b){const _0x4847c1=_0x4ff796;let _0x410c22=this[_0x4847c1(0x43f)]();_0x410c22=this['drawCraftBatchContentsList'](_0x410c22,_0x589c4b),this[_0x4847c1(0x3e3)](_0x410c22);},Window_ShopStatus[_0x4ff796(0x2f5)]['drawCraftBatchContentsList']=function(_0xdb46cc,_0x65b172){const _0x5aa684=_0x4ff796,_0x520cc3=DataManager[_0x5aa684(0x2a8)](_0x65b172),_0x373777=['items','weapons',_0x5aa684(0x341)];for(const _0x49f246 of _0x373777){const _0x5058ae=_0x520cc3[_0x49f246];for(const _0x11c090 in _0x5058ae){const _0x3850b0=Number(_0x11c090),_0x3d8f01=_0x5058ae[_0x11c090]||0x0;let _0x29ec0e=null;if(_0x49f246==='items')_0x29ec0e=$dataItems[_0x3850b0];if(_0x49f246===_0x5aa684(0x285))_0x29ec0e=$dataWeapons[_0x3850b0];if(_0x49f246==='armors')_0x29ec0e=$dataArmors[_0x3850b0];if(DataManager['isProxyItem'](_0x29ec0e))continue;_0x29ec0e&&(this[_0x5aa684(0x31d)](),this[_0x5aa684(0x41b)](_0xdb46cc,_0x29ec0e,_0x3d8f01),_0xdb46cc+=this[_0x5aa684(0x39a)]());}}return _0xdb46cc;};