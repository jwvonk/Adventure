class Dunes extends AdventureScene {
    constructor() {
        super('dunes', "The Dunes");
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('sanddunes', 'sanddunes.png');
        }
    onEnter() {
        this.add.image(this.w * .375, this.h * .4, 'sanddunes').setScale(1.64);
        let conch = this.add.text(this.w * 0.3, this.w * 0.3, "🐚")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => this.showMessage("What is a seashell doing in the middle of the desert?"))
            .on('pointerdown', () => {
                this.showMessage("Whoah, it just liquefied in my hands!");
                this.tweens.add({
                    targets: conch,
                    y: `+=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => conch.destroy()
                });
            });
        this.tweens.add({
            targets: conch,
            x: '+=' + this.s,
            yoyo: true,
            duration: 50,
            repeat: -1,
            repeatDelay: 2000
        });

        conch.on('pointerdown', () => {
            let stream = this.add.text(this.w * 0.3, this.h * .6, "🌊\n🌊\n🌊\n🌊\n🌊")
                .setFontSize(this.s * 5)
                .setAlpha(0)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("It's somehow flowing away from me—like it's pulling me in.")
                })
                .on('pointerdown', () => {
                    this.showMessage("I wonder where it leads…");
                    this.gotoScene('pyramid');
                });
            this.reveal(stream);

        })
    }
}

class Pyramid extends AdventureScene {
    constructor() {
        super("pyramid", "The Oceanic Pyramid");
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('seawall', 'seawall.jpg');
        }
    onEnter() {
        let submerged = false;
        this.add.image(this.w * .375, this.h * .4, 'seawall').setScale(.58);
        let dolphin = this.add.text(this.w * 0.1, this.w * 0.3, "🐬")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It seems like it's in distress. Maybe it wants to show me something?")
            })
            .on('pointerdown', () => {
                this.showMessage("What on Earth—I can breathe in here!");
                this.cameras.main.flash(1000, 17, 111, 133);
                this.tweens.add({
                    targets: dolphin,
                    angle: 360,
                    y: 0 - this.s,
                    duration: 1000,
                    onComplete: () => dolphin.destroy()
                });
                submerged = true;
            });
        this.bob(dolphin);

        dolphin.on('pointerdown', () => {
            let trail = this.add.text(this.w * 0.1, 0, "🫧\n🫧\n🫧\n🫧\n🫧")
                .setFontSize(this.s * 5)
                .setAlpha(0)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("That dolphin sure took off in a hurry!")
                })
                .on('pointerdown', () => {
                    this.showMessage("Better get after it!");
                    this.gotoScene('ship');
                });
            this.reveal(trail);
            this.bob(trail)
        });

        let scarab = this.add.text(this.w * 0.6, this.w * 0.1, "🪲")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage(submerged ? "How come I can breathe down here but this thing couldn't?" : "It must've drowned");
            })
        this.tweens.add({
            targets: scarab,
            angle: 360,
            duration: 50000,
            repeat: -1
        })
    }
}

class Ship extends AdventureScene {
    constructor() {
        super("ship", "The Sunken Ship");
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('deck', 'deck.png');
    }
    onEnter() {
        this.add.image(this.w * .375, this.h * .4, 'deck').setScale(1.64);
        let door = this.add.text(this.w * 0.35, this.w * 0.28, "🚪")
            .setFontSize(this.s * 5)
            .setAngle(-14)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Sword")) {
                    this.showMessage("Maybe I can pry it open.");
                } else {
                    this.showMessage("Whatever's behind this door is calling to me…");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Sword")) {
                    this.showMessage("Here goes nothing!");
                    this.gotoScene("heart");
                } else {
                    this.showMessage("It's wedged shut.");
                };
            });

        let doorGlow = door.preFX.addGlow('0x00ff8c', 20);

        this.flicker(doorGlow);

        let sword = this.add.text(this.w * 0.1, this.w * 0.32, "🗡️")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("How has this stayed so pristine down here?")
            })
            .on('pointerdown', () => {
                this.showMessage("It's still sharp! Better be careful with this…");
                this.tweens.add({
                    targets: sword,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => sword.destroy()
                });
                this.gainItem("Sword")
            });

        let swordGlow = sword.preFX.addGlow('0xfff8c4', 20);

        this.tweens.add({
            targets: swordGlow,
            outerStrength: 5,
            duration: 1000,
            yoyo: true,
            repeat: -1
        })
    }
}

class Heart extends AdventureScene {
    constructor() {
        super("heart", "The Heart");
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('quarters', 'quarters.png');
    }
    onEnter() {
        let shake;
        this.add.image(this.w * .375, this.h * .3, 'quarters').setScale(1.64);
        let consume = false;
        let heart = this.add.text(this.w * 0.3, this.h * 0.3, "💚")
            .setFontSize(this.s * 10)
            .setOrigin(.5, .5)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("Sword")) {
                    if (consume) {
                        this.showMessage("It's draining my life force!")
                    } else {
                        this.showMessage("Is it… dying?");
                    }
                }
                else {
                    this.showMessage("I can't hit it!");
                    shake.remove();
                    this.tweens.add({
                        targets: heart,
                        x: this.s + (this.h - 2 * this.s) * Math.random(),
                        y: this.s + (this.h - 2 * this.s) * Math.random(),
                        ease: 'Sine.inOut',
                        duration: 400,
                        onComplete: () => {
                            shake = this.tweens.add({
                                targets: heart,
                                x: `+=${this.s}`,
                                yoyo: true,
                                duration: 50,
                                repeat: -1,
                            }) 
                        }
                    })
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("Sword")) {
                    if (consume === false) {
                        consume = true;
                        this.cameras.main.shake(10000, 0.01);
                        this.showMessage
                        this.cameras.main.fadeOut(10000, 255, 0, 0);
                        shake = this.tweens.add({
                            targets: heart,
                            x: `+=${this.s}`,
                            yoyo: true,
                            duration: 50,
                            repeat: -1,
                        })
                        this.time.delayedCall(10000, () => {
                            this.input.setDefaultCursor("default");
                            this.cameras.main.fadeOut(0, 0, 0, 0);
                            this.gotoScene("consumed");
                        });
                    }
                } else {
                    this.input.setDefaultCursor("default");
                    this.swordCursor.destroy();
                    this.cameras.main.fadeOut(0, 0, 0, 0);
                    this.gotoScene("destroyed");
                }
            });

        let heartGlow = heart.preFX.addGlow('0x00ff8c', 100);

        this.flicker(heartGlow);

        this.swordCursor = this.add.text(this.w * 0.1, this.w * 0.3, "🗡️")
            .setFontSize(this.s * 5)
            .setOrigin(0, 1)
            .setAlpha(0);

        heart.on('pointerdown', () => {
            let sword = this.add.text(this.w * 0.1, this.w * 0.3, "🗡️")
                .setFontSize(this.s * 5)
                .setAlpha(0)
                .setInteractive()
                .on('pointerdown', () => {
                    this.loseItem("Sword");
                    this.input.setDefaultCursor('none');
                    this.swordCursor.setAlpha(1);
                    sword.destroy();
                });
            this.reveal(sword);
            let swordGlow = sword.preFX.addGlow('0xfff8c4', 20);
            this.tweens.add({
                targets: swordGlow,
                outerStrength: 5,
                duration: 1000,
                yoyo: true,
                repeat: -1
            })
        })
        
        let swordCursorGlow = this.swordCursor.preFX.addGlow('0xfff8c4', 20);

        this.tweens.add({
            targets: swordCursorGlow,
            outerStrength: 5,
            duration: 1000,
            yoyo: true,
            repeat: -1
        })
    }

    update() {
        let { x, y } = this.input.activePointer;
        this.swordCursor.setPosition(x, y);
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50, 50, "The Desert Ocean").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('dunes'));
        });
    }
}

class Consumed extends Phaser.Scene {
    constructor() {
        super('consumed');
    }
    create() {
        this.cameras.main.fadeIn(5000, 0, 0, 0);
        this.add.text(50, 50, "You have been consumed by the pyramid.\nThe Desert Ocean lives on.").setFontSize(50);
        this.add.text(50, 150, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

class Destroyed extends Phaser.Scene {
    constructor() {
        super('destroyed');
    }
    create() {
        this.cameras.main.fadeIn(5000, 0, 0, 0);
        this.add.text(50, 50,"The heart has been destroyed.\nThe Desert Ocean is no more.").setFontSize(50);
        this.add.text(50, 150, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Dunes, Pyramid, Ship, Heart, Consumed, Destroyed],
    title: "Adventure Game",
});

