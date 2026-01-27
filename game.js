const storyData = {
  start: {
    text:
      "You wake up suddenly.\n\n" +
      "The clock reads 02:17 AM.\n\n" +
      "Your phone lights up on its own.\n\n" +
      "Unknown Contact:\n“Don’t open the door.”",
    choices: [
      { label: "Check the door", next: "check_door" },
      { label: "Reply to the message", next: "reply_message" }
    ]
  },

  check_door: {
    text:
      "You step closer to the door.\n\n" +
      "The hallway is silent.\n\n" +
      "But the elevator light is on at the end of the corridor.",
    choices: [
      { label: "Go to the elevator", next: "elevator" },
      { label: "Lock the door", next: "lock_door" }
    ]
  },

  elevator: {
    text:
      "The elevator doors are open.\n\n" +
      "There is no one inside.\n\n" +
      "Your phone vibrates.\n\n" +
      "“I told you not to.”",
    ending: "DISOBEYED"
  },

  lock_door: {
    text:
      "You lock the door and step back.\n\n" +
      "The elevator light turns off.\n\n" +
      "Your phone buzzes one last time.\n\n" +
      "“You’re safe now.”",
    ending: "SAFE"
  },

  reply_message: {
    text:
      "You type slowly.\n\n" +
      "You: “Who are you?”\n\n" +
      "The reply comes instantly.\n\n" +
      "“Someone who already made this mistake.”",
    choices: [
      { label: "Ask what they mean", next: "truth" },
      { label: "Turn off the phone", next: "turn_off" }
    ]
  },

  truth: {
    text:
      "“Check the time.”\n\n" +
      "The clock flickers.\n\n" +
      "02:17 AM\n\n" +
      "The message appears again—\nfrom your own number.",
    ending: "THE TRUTH"
  },

  turn_off: {
    text:
      "The screen goes dark.\n\n" +
      "The knocking begins.\n\n" +
      "Slowly.\n\n" +
      "From your door.",
    ending: "SILENCE"
  }
};

class StoryScene extends Phaser.Scene {
  constructor() {
    super("StoryScene");
  }

  create() {
    this.storyText = this.add.text(80, 80, "", {
      fontSize: "24px",
      color: "#ffffff",
      wordWrap: { width: 640 },
      lineSpacing: 10
    });

    this.choiceButtons = [];

    this.showNode("start");
  }

  showNode(nodeKey) {
    const node = storyData[nodeKey];

    // Clear old choices
    this.choiceButtons.forEach(btn => btn.destroy());
    this.choiceButtons = [];

    // Update story text
    this.storyText.setText(node.text);

    // If ending
    if (node.ending) {
      const endingText = this.add.text(80, 450,
        `ENDING: ${node.ending}`,
        { fontSize: "22px", color: "#ff5555" }
      );
      this.choiceButtons.push(endingText);
      return;
    }

    // Create choice buttons
    node.choices.forEach((choice, index) => {
      const btn = this.add.text(
        100,
        420 + index * 50,
        choice.label,
        {
          fontSize: "20px",
          backgroundColor: "#333333",
          padding: { x: 14, y: 10 }
        }
      )
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.showNode(choice.next);
      });

      this.choiceButtons.push(btn);
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  backgroundColor: "#111111",
  scene: StoryScene
};

new Phaser.Game(config);
