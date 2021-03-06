import { Injectable } from '@angular/core';
import { SeekerUtilFuncService } from './seeker-util-func.service';

declare global {
  interface Window {player: any;}
}

declare var shaka: any;

@Injectable({
  providedIn: 'root'
})
export class ShakaPlayerService {
  
  constructor(private util: SeekerUtilFuncService) {}

  AUDIO = null;
  manifestUri = 'assets/dash/on_my_way_64kbps.mpd';
  public musicBuffering = false;

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
      this.initShakaEvents(player);

      //this.loadManifest(this.manifestUri);

      
  }


  onErrorEvent(event) {
      // Extract the shaka.util.Error object from the event.
      this.onError(event.detail);
  }

  onError(error) {
      // Log the error.
      console.error('Error code', error.code, 'object', error);
  }
  getPlayer () {
    return window.player;
  }

  loadManifest(manifestUri) {
    // Try to load a manifest.
    console.log(manifestUri);
    window.player.load(manifestUri)
    .then(() => {
      const totalTime = this.util.getTimer(this.AUDIO.duration);
      const currTime = this.util.getTimer(0);
      
      this.util.enablePlayer();
      this.util.loadTimes(currTime, totalTime);
      this.AUDIO.play();
      console.log('The audio has now been loaded!');
    })
    .catch(err => {
      this.AUDIO.pause();
      this.util.disablePlayer();
      this.util.resetTimes();
      alert("There was an ERROR while loading music! please contact to adminstrator.");
      this.onError(err)
    })
  }

  //shaka events--------------
  initShakaEvents(player) {
    //player.addEventListener('error', this.onErrorEvent);
    //buffering events
    player.addEventListener('buffering', e => {
      console.log('buffring', e)
      this.musicBuffering = true;
      //el_buffer.innerHTML =  `buffering...`
    })
    setInterval(() => {
      if(!player.isBuffering())
      this.musicBuffering = false;
    }, 1000);
    //--------------------------
    player.addEventListener('error', e => {
      console.error('error', e)
      if(e.detail.code === 1001) {
        //resource not fount. 404
        this.util.disablePlayer();
        this.util.resetTimes();
        alert("Resource Not found! please contact to adminstrator.");

      }
    })
  }

  onDomReady() {
    this.initApp();
  }

  



}
