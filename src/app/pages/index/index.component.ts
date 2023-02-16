import { Component, OnInit, OnDestroy } from "@angular/core";
import { nip19, generatePrivateKey, getPublicKey } from "nostr-tools";
import { bech32 } from "bech32";
@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  public suffix: string
  public prefix: string
  public found: boolean
  public publicKey: string
  public npub: string
  public privateKey: string
  public nsec: string

  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

  }

  setPrefix() {
    this.suffix = null
  }

  setSuffix() {
    this.prefix = null
  }

  generateVanity() {
    console.log(this.prefix)
    console.log(this.suffix)
    let result
    while(!this.found) {
      this.privateKey = generatePrivateKey()
      this.nsec = nip19.nsecEncode(this.privateKey)
  
      this.publicKey = getPublicKey(this.privateKey)
      this.npub = nip19.npubEncode(this.publicKey)
      if(this.prefix) {
        result = this.npub.substring(5, this.prefix.length+5)
        this.found = this.npub.substring(5, this.prefix.length+5).startsWith(this.prefix)
      } else {
        result = this.npub.substring(this.npub.length-this.suffix.length, this.npub.length)
        this.found = this.npub.substring(this.npub.length-this.suffix.length, this.npub.length).startsWith(this.suffix)
      }

      if(this.found) {
        debugger
        return this.npub;
      }
    }
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
