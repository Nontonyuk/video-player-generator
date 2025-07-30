import { type PlayerConfig, type InsertPlayerConfig } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPlayerConfig(id: string): Promise<PlayerConfig | undefined>;
  createPlayerConfig(config: InsertPlayerConfig): Promise<PlayerConfig>;
  generatePlayerCode(config: InsertPlayerConfig): Promise<{ iframeCode: string; directLink: string }>;
}

export class MemStorage implements IStorage {
  private playerConfigs: Map<string, PlayerConfig>;

  constructor() {
    this.playerConfigs = new Map();
  }

  async getPlayerConfig(id: string): Promise<PlayerConfig | undefined> {
    return this.playerConfigs.get(id);
  }

  async createPlayerConfig(insertConfig: InsertPlayerConfig): Promise<PlayerConfig> {
    const id = randomUUID();
    const { iframeCode, directLink } = await this.generatePlayerCode(insertConfig);
    
    const config: PlayerConfig = {
      ...insertConfig,
      id,
      format: insertConfig.format || null,
      iframeCode,
      directLink,
      createdAt: new Date()
    };
    
    this.playerConfigs.set(id, config);
    return config;
  }

  async generatePlayerCode(config: InsertPlayerConfig): Promise<{ iframeCode: string; directLink: string }> {
    const playerId = `player_${Date.now()}`;
    const { playerType, videoUrl, autoplay, controls, provider } = config;

    // Configuration from template
    const gDriveApikey = "AIzaSyBFMFpXlK9xKpwcr2x9etwLUdKtyOwDWIc";
    const poster = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhE0YYTCJ7b7DZncRo4lGnukDt0WiH76h5VeB6va8gqQ61U4HTWiUgGYiQAi57p8byp_lUDNcgy5OZKP8afZdWulPM7pJW4lLGftXRnYVHSIXWNoG9hLxryNFa2SdLJRNhV-XVjP1rPq182He4hkuacL-K_hqCppvOLLhZiV0wXRLuebBnlkkw-ZC0-/s720/1163369.jpg";
    const license = "6231804437878254014";
    const ads = {
      title: "Iklan Title",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjMcB0I1wxMTKyMxhx8TEbHKAiHAaXFHTttDUNsZeIQmuOodgLSA4NoRlXL51HRbDuiLzjt9ueMS3uo4-KyL90v_Yco8T196Pgxwiu_sQzA7U4FAax_c4IqG1WS5FnliViGvxv8mW_cwh48U0_NaN_f2KLXfImPU2b7B0SR1lRTqr6eBVCq6jdMCRl9ZQ/s460/DAYAT.ID.png",
      url: "https://www.dayat.id/2022/09/player-version-2-template.html"
    };

    let playerHtml = '';
    
    switch (playerType) {
      case 'plyr':
        playerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plyr Video Player</title>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    <style>
        /* Main CSS from template */
        body{margin:0;padding:0}*,:after,:before{box-sizing:border-box}html{overflow-y:scroll}
        body{font-family:'Titillium Web',sans-serif}
        #arsipin,#fluid_video_wrapper_video,body>.plyr{position:absolute;width:100%!important;height:100%!important}
        .jw-button-color:hover,.jw-open,.jw-progress,.jw-toggle,.jw-toggle:hover{color:#008fee!important}
        .jw-active-option{background-color:#008fee!important}
        .plyr{width:100vw;height:100vh}
        .plyr__poster{background-size:cover;background-position:center}
    </style>
</head>
<body>
    <video id="${playerId}" ${autoplay ? 'autoplay' : ''} ${controls ? 'controls' : ''} crossorigin playsinline poster="${poster}">
        <source src="${videoUrl}" type="video/mp4" />
    </video>
    <script src="https://cdn.plyr.io/3.7.8/plyr.polyfilled.js"></script>
    <script>
        const config = {
            gDriveApikey: "${gDriveApikey}",
            poster: "${poster}",
            license: "${license}",
            ads: ${JSON.stringify(ads)}
        };
        
        const player = new Plyr('#${playerId}', {
            controls: ${controls ? JSON.stringify(['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen']) : false},
            autoplay: ${autoplay},
            poster: config.poster,
            quality: { default: 720, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] }
        });
    </script>
</body>
</html>`;
        break;
      
      case 'jwpl':
        playerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JW Player</title>
    <script src="https://cdn.jwplayer.com/libraries/KB5zFt7A.js"></script>
    <style>
        body{margin:0;padding:0}*,:after,:before{box-sizing:border-box}html{overflow-y:scroll}
        body{font-family:'Titillium Web',sans-serif;background:#000}
        .jw-button-color:hover,.jw-open,.jw-progress,.jw-toggle,.jw-toggle:hover{color:#008fee!important}
        .jw-active-option{background-color:#008fee!important}
        #${playerId} { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="${playerId}"></div>
    <script>
        const config = {
            gDriveApikey: "${gDriveApikey}",
            poster: "${poster}",
            license: "${license}",
            ads: ${JSON.stringify(ads)}
        };
        
        jwplayer("${playerId}").setup({
            file: "${videoUrl}",
            image: config.poster,
            width: "100%",
            height: "100vh",
            autostart: ${autoplay},
            controls: ${controls},
            stretching: "uniform",
            primary: "html5",
            skin: {
                name: "seven",
                color: "#008fee"
            },
            advertising: {
                client: "vast",
                schedule: {
                    "adbreak1": {
                        offset: "pre",
                        tag: config.ads.url
                    }
                }
            }
        });
    </script>
</body>
</html>`;
        break;

      case 'fluidplayer':
        playerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fluid Player</title>
    <link rel="stylesheet" href="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.css" />
    <style>
        body{margin:0;padding:0}*,:after,:before{box-sizing:border-box}html{overflow-y:scroll}
        body{font-family:'Titillium Web',sans-serif;background:#000}
        #arsipin,#fluid_video_wrapper_video,body>.plyr{position:absolute;width:100%!important;height:100%!important}
        video { width: 100vw; height: 100vh; object-fit: contain; }
        .fluid_video_wrapper { position: absolute; width: 100% !important; height: 100% !important; }
    </style>
</head>
<body>
    <video id="${playerId}" ${autoplay ? 'autoplay' : ''} ${controls ? 'controls' : ''} poster="${poster}">
        <source src="${videoUrl}" type="video/mp4" />
    </video>
    <script src="https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js"></script>
    <script>
        const config = {
            gDriveApikey: "${gDriveApikey}",
            poster: "${poster}",
            license: "${license}",
            ads: ${JSON.stringify(ads)}
        };
        
        fluidPlayer("${playerId}", {
            layoutControls: {
                autoHide: true,
                controlBar: {
                    autoHideTimeout: 3,
                    animated: true,
                    autoHide: true
                },
                primaryColor: "#008fee"
            },
            vastOptions: {
                adList: [{
                    roll: 'preRoll',
                    vastTag: config.ads.url
                }]
            }
        });
    </script>
</body>
</html>`;
        break;
      
      default: // video
        playerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Video Player</title>
    <style>
        body{margin:0;padding:0}*,:after,:before{box-sizing:border-box}html{overflow-y:scroll}
        body{font-family:'Titillium Web',sans-serif;background:#000}
        video { width: 100vw; height: 100vh; object-fit: contain; }
    </style>
</head>
<body>
    <video id="${playerId}" ${autoplay ? 'autoplay' : ''} ${controls ? 'controls' : ''} crossorigin playsinline poster="${poster}">
        <source src="${videoUrl}" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <script>
        const config = {
            gDriveApikey: "${gDriveApikey}",
            poster: "${poster}",
            license: "${license}",
            ads: ${JSON.stringify(ads)}
        };
    </script>
</body>
</html>`;
    }

    const iframeCode = `<iframe src="data:text/html;base64,${Buffer.from(playerHtml).toString('base64')}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`;
    
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5000';
    const directLink = `${baseUrl}/player/${playerId}`;

    return { iframeCode, directLink };
  }
}

export const storage = new MemStorage();
