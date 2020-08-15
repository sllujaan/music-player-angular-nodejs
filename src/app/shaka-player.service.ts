import { Injectable } from '@angular/core';

declare global {
  interface Window {player: any;}
}

declare var shaka: any;

@Injectable({
  providedIn: 'root'
})
export class ShakaPlayerService {
  
  constructor() {}

  AUDIO = null;
  manifestUri = 'assets/dash/on_my_way_64kbps.mpd'

  setAudio(audio) {
    this.AUDIO = audio;
  }
  
  print() {
    console.log(this.AUDIO);
  }


  initApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
        // Everything looks good!
        this.initPlayer();
    } else {
        // This browser does not have the minimum set of APIs we need.
        console.error('Browser not supported!');
    }
  }

  async initPlayer() {
      // Create a Player instance.
      
      const player = new shaka.Player(this.AUDIO);

      // set the rebuffering goal to 15 seconds and revert buffering goal to default:
      player.configure({
      streaming: {
          bufferingGoal: 30,
          rebufferingGoal: 2,
          bufferBehind: 2
      }
      });

      // Attach player to the window to make it easy to access in the JS console.
      window.player = player;

      // Listen for error events.
      player.addEventListener('error', this.onErrorEvent);

      // Try to load a manifest.
      player.load(this.manifestUri)
      .then(() => {
        console.log('The audio has now been loaded!');
      })
      .catch(err => {
        this.onError(err)
      })

      
  }


  onErrorEvent(event) {
      // Extract the shaka.util.Error object from the event.
      this.onError(event.detail);
  }

  onError(error) {
      // Log the error.
      console.error('Error code', error.code, 'object', error);
  }

  onDomReady() {
    this.initApp();
  }


}
