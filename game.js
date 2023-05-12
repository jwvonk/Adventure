class Dunes extends AdventureScene {
    constructor() {
        super('dunes', "The Dunes");
    }

    onEnter() {
        let conch = this.add.text(this.w * 0.3, this.w * 0.3, "🐚 Shell")
            .setFontSize(this.s * 5)
            .setInteractive()
            // this.tweens.add({
            //         targets: clip,
            //         x: '+=' + this.s,
            //         repeat: 2,
            //         yoyo: true,
            //         ease: 'Sine.inOut',
            //         duration: 100
            //     });
            .on('pointerover', () => this.showMessage("What is a seashell doing in the middle of the desert?"))
            .on('pointerdown', () => {
                this.showMessage("Whoah, it just liquefied in my hands!");
                this.tweens.add({
                    targets: conch,
                    y: `-=${2 * this.s}`,
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
            })
        
        conch.on('pointerdown', () => {
            let stream = this.add.text(this.w * 0.5, this.w * 0.1, "🌊🌊🌊 Stream")
            .setFontSize(this.s * 5)
            .setAlpha(0)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's somehow flowing away from me—like it's pulling me in.")
            })
            .on('pointerdown', () => {
                this.showMessage("I wonder where it leads…");
                // this.tweens.add({
                //     targets: key,
                //     y: `-=${2 * this.s}`,
                //     alpha: { from: 1, to: 0 },
                //     duration: 500,
                //     onComplete: () => key.destroy()
                // });
                this.gotoScene('demo2');
            });
            this.tweens.add({
                targets: stream,
                alpha: 1,
                duration: 500
            });

        })    
        // let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         if (this.hasItem("key")) {
        //             this.showMessage("You've got the key for this door.");
        //         } else {
        //             this.showMessage("It's locked. Can you find a key?");
        //         }
        //     })
        //     .on('pointerdown', () => {
        //         if (this.hasItem("key")) {
        //             this.loseItem("key");
        //             this.showMessage("*squeak*");
        //             door.setText("🚪 unlocked door");
        //             this.gotoScene('demo2');
        //         }
        //     })

    }
}

class Pyramid extends AdventureScene {
    constructor() {
        super("pyramid", "The Oceanic Pyramid");
    }
    onEnter() {
        // let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage('*giggles*');
        //         this.tweens.add({
        //             targets: finish,
        //             x: this.s + (this.h - 2 * this.s) * Math.random(),
        //             y: this.s + (this.h - 2 * this.s) * Math.random(),
        //             ease: 'Sine.inOut',
        //             duration: 500
        //         });
        //     })
        //     .on('pointerdown', () => this.gotoScene('outro'));
        let dolphin = this.add.text(this.w * 0.5, this.w * 0.1, "🐬 Dolphin")
            .setFontSize(this.s * 5)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It seems like it's in distress. Maybe it wants to show me something?")
            })
            .on('pointerdown', () => {
                this.showMessage("What on Earth—I can breathe in here!");
                dolphin.setText("🐬")
                this.tweens.add({
                    targets: dolphin,
                    angle: 360,
                    x: 0 - this.s * 5,
                    duration: 1000,
                    onComplete: () => dolphin.destroy()
                });
            });
            this.tweens.add({
                targets: dolphin,
                y: '+=' + this.s,
                yoyo: true,
                duration: 500,
                repeat: -1,
                ease: 'Sine.inOut'
            })
            dolphin.on('pointerdown', () => {
                let trail = this.add.text(this.w * 0.5, this.w * 0.1, "🫧 Trail")
                .setFontSize(this.s * 5)
                .setAlpha(0)
                .setInteractive()
                .on('pointerover', () => {
                    this.showMessage("That dolphin sure took off in a hurry!")
                })
                .on('pointerdown', () => {
                    this.showMessage("Better get after it!");
                    // this.tweens.add({
                    //     targets: key,
                    //     y: `-=${2 * this.s}`,
                    //     alpha: { from: 1, to: 0 },
                    //     duration: 500,
                    //     onComplete: () => key.destroy()
                    // });
                    this.gotoScene('demo2');
                });
                this.tweens.add({
                    targets: trail,
                    alpha: 1,
                    duration: 500
                });
            })
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        // REMOVE FOR FINAL BUILD
        this.scene.start('pyramid');

        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('demo1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
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
    scene: [Intro, Dunes, Pyramid, Outro],
    title: "Adventure Game",
});

