(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    // Add your custom code here.
  };

  var TITLE = "Social Democracy: Petrograd 1917" + '_' + "Autumn Chen";

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };
  
  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.displayText = function (text) {
        return applyWholesome(text);
    };
  
    //To get a value 
    function getSizeText(value) {
        if (value === undefined || value === null) return '';
        if (value <= 20) return '<span style="color: #6B7280;">Minimal</span>';
        if (value <= 40) return '<span style="color: #8B6F47;">Weak</span>';
        if (value <= 60) return '<span style="color: #556B2F;">Moderate</span>';
        if (value <= 80) return '<span style="color: #7A0000;">Strong</span>';
        return '<span style="color: #2B0000;">Very Strong</span>';
    }
  
    function getMilitancyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value <= 0.05) return '<span style="color: #008000;">Nonexistent</span>';
        if (value <= 0.14) return '<span style="color: #32CD32;">Very low</span>';
        if (value <= 0.24) return '<span style="color: #9ACD32;">Low</span>';
        if (value <= 0.44) return '<span style="color: #FFD700;">Medium-low</span>';
        if (value <= 0.69) return '<span style="color: #FFA500;">Medium</span>';
        if (value <= 1) return '<span style="color: #FF4500;">High</span>';
        return '<span style="color: #FF0000;">Very high</span>';
    }
    
    function getLoyaltyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value <= 0.06) return '<span style="color: #FF0000;">Completely disloyal</span>';
        if (value <= 0.19) return '<span style="color: #FF4500;">Very disloyal</span>';
        if (value <= 0.31) return '<span style="color: #FF8C00;">Generally disloyal</span>';
        if (value <= 0.41) return '<span style="color: #FFA500;">Mostly disloyal</span>';
        if (value <= 0.54) return '<span style="color: #FFD700;">Divided</span>';
        if (value <= 0.71) return '<span style="color: #9ACD32;">Mostly loyal</span>';
        if (value <= 0.95) return '<span style="color: #32CD32;">Generally loyal</span>';
        return '<span style="color: #008000;">Completely loyal</span>';
    }
  
    function getIdeologyText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value == 0) return '<span style="color: #8B0000;">Revolutionary Socialism</span>';
        if (value == 1) return '<span style="color: #FF0000;">Marxism-Leninism</span>';
        if (value == 2) return '<span style="color: #E34234;">Democratic Socialism</span>';
        if (value == 3) return '<span style="color: #CD5C5C;">Left-wing Nationalism</span>';
        if (value == 4) return '<span style="color: #B22222;">Trotskyism</span>';
        if (value == 5) return '<span style="color: #FF8C00;">Sinhalese Buddhist Nationalism</span>';
        if (value == 6) return '<span style="color: #9932CC;">Federalism</span>';
        if (value == 7) return '<span style="color: #DAA520;">Tamil Eelam Separatism</span>';
        if (value == 8) return '<span style="color: #D2691E;">Indian Tamil Rights</span>';
        if (value == 9) return '<span style="color: #20B2AA;">Muslim Minority Politics</span>';
        if (value == 10) return '<span style="color: #FF69B4;">Social Democracy</span>';
        if (value == 11) return '<span style="color: #FFA500;">Tamil Nationalism</span>';
        if (value == 12) return '<span style="color: #FF6347;">Left Wing Populism</span>';
        if (value == 13) return '<span style="color: #228B22;">Conservatism</span>';
        if (value == 14) return '<span style="color: #32CD32;">Neo Liberalism</span>';
        if (value == 15) return '<span style="color: #800080;">Anti-Imperialism</span>';
        if (value == 16) return '<span style="color: #2E0854;">Unitary Stateism</span>';
        return 'Unknown';
    }

    function getStrenghtText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value < 10) return '<span style="color: #ADD8E6;">Weak</span>';
        if (value < 25) return '<span style="color: #6495ED;">Moderate</span>';
        if (value < 40) return '<span style="color: #4169E1;">Strong</span>';
        if (value < 60) return '<span style="color: #0000CD;">Very strong</span>';
        return '<span style="color: #00008B;">Dominant</span>';
    }

    function getDissentText(value) {
        if (value === undefined || value === null) return 'Unknown';
        if (value < 4.999) return '<span style="color: #008000;">Very low</span>';
        if (value < 14.999) return '<span style="color: #9ACD32;">Low</span>';
        if (value < 30.999) return '<span style="color: #FFD700;">Medium</span>';
        if (value < 49.999) return '<span style="color: #FF4500;">High</span>';
        return '<span style="color: #FF0000;">Very high</span>';
    }
  
    //To check if extra dynamic or not
    function getDynamicTooltipContent(searchString, baseTooltip) {
        var Q = window.dendryUI && window.dendryUI.dendryEngine && window.dendryUI.dendryEngine.state ? 
                window.dendryUI.dendryEngine.state.qualities : null;
        
        if (!Q) return baseTooltip.explanationText;

        if (searchString === 'Sinhalese' && Q.sinhala_proportion !== undefined) {
            var proptext = Q.sinhala_proportion;
            return baseTooltip.explanationText + '<br>' + proptext + '% of the population';
        }

        if (searchString === 'Sri Lankan Tamil' && Q.sltamil_proportion !== undefined) {
            var proptext = Q.sltamil_proportion;
            return baseTooltip.explanationText + '<br>' + proptext + '% of the population';
        }

        if (searchString === 'Tamil' && Q.sltamil_proportion !== undefined) {
            var proptext = Q.sltamil_proportion;
            return baseTooltip.explanationText + '<br>' + proptext + '% of the population';
        }

        if (searchString === 'Indian Tamil' && Q.itamil_proportion !== undefined) {
            var proptext = Q.itamil_proportion;
            return baseTooltip.explanationText + '<br>' + proptext + '% of the population';
        }

        if (searchString === 'Muslims' && Q.muslim_proportion !== undefined) {
            var proptext = Q.muslim_proportion;
            return baseTooltip.explanationText + '<br>' + proptext + '% of the population';
        }
        
        if (searchString === 'RSDLP (B)' && Q.b_relation !== undefined) {
            var ideologyText = getIdeologyText(Q.b_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText;
        }

        if (searchString === 'Left' ) {
            var strenghtText = getStrenghtText(Q.left_strength);
            var dissentText = getDissentText(Q.left_dissent);
            return baseTooltip.explanationText + '<br>Strength: ' + strenghtText + '<br>Dissent: ' + dissentText;
        }

        if (searchString === 'Nationalists' ) {
            var strenghtText = getStrenghtText(Q.nationalist_strength);
            var dissentText = getDissentText(Q.nationalist_dissent);
            return baseTooltip.explanationText + '<br>Strength: ' + strenghtText + '<br>Dissent: ' + dissentText;
        }
      
        if (searchString === 'SLMP' && Q.slmp_relation !== undefined) {
            var relationText = getRelationshipText(Q.slmp_relation);
            var ideologyText = getIdeologyText(Q.slmp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
      
        if (searchString === 'UNP' && Q.unp_relation !== undefined) {
            var relationText = getRelationshipText(Q.unp_relation);
            var ideologyText = getIdeologyText(Q.unp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'TULF' && Q.tulf_relation !== undefined) {
            var relationText = getRelationshipText(Q.tulf_relation);
            var ideologyText = getIdeologyText(Q.tulf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'PFLT' && Q.pflt_relation !== undefined) {
            var relationText = getRelationshipText(Q.pflt_relation);
            var ideologyText = getIdeologyText(Q.pflt_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'ACTC' && Q.actc_relation !== undefined) {
            var relationText = getRelationshipText(Q.actc_relation);
            var ideologyText = getIdeologyText(Q.actc_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'DPLF' && Q.dplf_relation !== undefined) {
            var relationText = getRelationshipText(Q.dplf_relation);
            var ideologyText = getIdeologyText(Q.dplf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'JVP' && Q.jvp_relation !== undefined) {
            var relationText = getRelationshipText(Q.jvp_relation);
            var ideologyText = getIdeologyText(Q.jvp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'NPP' && Q.npp_relation !== undefined) {
            var relationText = getRelationshipText(Q.npp_relation);
            var ideologyText = getIdeologyText(Q.npp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }

        if (searchString === 'UCPF' && Q.ucpf_relation !== undefined) {
            var relationText = getRelationshipText(Q.ucpf_relation);
            var ideologyText = getIdeologyText(Q.ucpf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }

        if (searchString === 'ULPP' && Q.ulpp_relation !== undefined) {
            var relationText = getRelationshipText(Q.ulpp_relation);
            var ideologyText = getIdeologyText(Q.ulpp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }

        if (searchString === 'DUNF' && Q.dunf_relation !== undefined) {
            var relationText = getRelationshipText(Q.dunf_relation);
            var ideologyText = getIdeologyText(Q.dunf_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'CPSL' && Q.cpsl_relation !== undefined) {
            var relationText = getRelationshipText(Q.cpsl_relation);
            var ideologyText = getIdeologyText(Q.cpsl_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'LSSP' && Q.lssp_relation !== undefined) {
            var relationText = getRelationshipText(Q.lssp_relation);
            var ideologyText = getIdeologyText(Q.lssp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'NSSP' && Q.nssp_relation !== undefined) {
            var relationText = getRelationshipText(Q.nssp_relation);
            var ideologyText = getIdeologyText(Q.nssp_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'MEP' && Q.mep_relation !== undefined) {
            var relationText = getRelationshipText(Q.mep_relation);
            var ideologyText = getIdeologyText(Q.mep_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'CWC' && Q.cwc_relation !== undefined) {
            var relationText = getRelationshipText(Q.cwc_relation);
            var ideologyText = getIdeologyText(Q.cwc_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }
        
        if (searchString === 'SLMC' && Q.slmc_relation !== undefined) {
            var relationText = getRelationshipText(Q.slmc_relation);
            var ideologyText = getIdeologyText(Q.slmc_ideology);
            return baseTooltip.explanationText + '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
        }

        if (searchString === 'JSS' && Q.jss_strength !== undefined) {
            var strength = getSizeText(Q.jss_strength);
            var status = getStatusText(Q.jss_gstatus);
            var militancy = getMilitancyText(Q.jss_militancy);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
     
        if (searchString === 'LTTE' && Q.ltte_strength !== undefined) {
            var strength = getSizeText(Q.ltte_strength);
            var militancy = getMilitancyText(Q.ltte_militancy);
            var status = getStatusText(Q.ltte_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
        
        if (searchString === 'TELO' && Q.telo_strength !== undefined) {
            var strength = getSizeText(Q.telo_strength);
            var status = getStatusText(Q.telo_gstatus);
            var militancy = getMilitancyText(Q.telo_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
            if (Q.telo_gstatus === 3) {
                var ideologyText = getIdeologyText(Q.telo_ideology);
                var relationText = getRelationshipText(Q.telo_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }
        
        if (searchString === 'EPRLF' && Q.eprlf_strength !== undefined) {
            var strength = getSizeText(Q.eprlf_strength);
            var status = getStatusText(Q.eprlf_gstatus);
            var militancy = getMilitancyText(Q.eprlf_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
            if (Q.eprlf_gstatus === 3) {
                var ideologyText = getIdeologyText(Q.eprlf_ideology);
                var relationText = getRelationshipText(Q.eprlf_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }

        if (searchString === 'EROS' && Q.eros_relation !== undefined) {
            var strength = getSizeText(Q.eros_strength);
            var status = getStatusText(Q.eros_gstatus);
            var militancy = getMilitancyText(Q.eros_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
            if (Q.eros_gstatus === 3) {
                var ideologyText = getIdeologyText(Q.eros_ideology);
                var relationText = getRelationshipText(Q.eros_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }
        
        if (searchString === 'PLOTE' && Q.plote_strength !== undefined) {
            var strength = getSizeText(Q.plote_strength);
            var militancy = getMilitancyText(Q.plote_militancy);
            var status = getStatusText(Q.plote_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
        
       
        if (searchString === 'DJV' && Q.djv_strength !== undefined) {
            var strength = getSizeText(Q.djv_strength);
            var militancy = getMilitancyText(Q.djv_militancy);
            var status = getStatusText(Q.djv_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
      
        if (searchString === 'EPDP' && Q.epdp_strength !== undefined) {
            var strength = getSizeText(Q.epdp_strength);
            var militancy = getMilitancyText(Q.epdp_militancy);
            var status = getStatusText(Q.epdp_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

        if (searchString === 'PRRA' && Q.prra_strength !== undefined) {
            var strength = getSizeText(Q.prra_strength);
            var militancy = getMilitancyText(Q.prra_militancy);
            var status = getStatusText(Q.prra_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

        if (searchString === 'Eagles' && Q.eagles_strength !== undefined) {
            var strength = getSizeText(Q.eagles_strength);
            var militancy = getMilitancyText(Q.eagles_militancy);
            var status = getStatusText(Q.eagles_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

        if (searchString === 'Black Cats' && Q.blackcats_strength !== undefined) {
            var strength = getSizeText(Q.blackcats_strength);
            var militancy = getMilitancyText(Q.blackcats_militancy);
            var status = getStatusText(Q.blackcats_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }

       if (searchString === 'ENDLF' && Q.endlf_strength !== undefined) {
            var strength = getSizeText(Q.endlf_strength);
            var status = getStatusText(Q.endlf_gstatus);
            var militancy = getMilitancyText(Q.endlf_militancy);
            var content = baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;

            if (Q.endlf_gstatus == 3) {
                var ideologyText = getIdeologyText(Q.endlf_ideology);
                var relationText = getRelationshipText(Q.endlf_relation);
                content += '<br>Ideology: ' + ideologyText + '<br>Relation: ' + relationText;
            }
            return content;
        }

        if (searchString === 'TNA' && Q.tna_strength !== undefined) {
            var strength = getSizeText(Q.tna_strength);
            var militancy = getMilitancyText(Q.tna_militancy);
            var status = getStatusText(Q.tna_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + '<br>Militarization: ' + militancy;
        }
        
        if (searchString === 'Sri Lanka Armed Forces' && Q.slaf_strength !== undefined) {
            var strength = Q.slaf_strength ? Q.slaf_strength : '0';
            var morale = getLoyaltyText(Q.slaf_morale);
            var readiness = getMilitancyText(Q.slaf_readiness)
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale + '<br>Readiness:' + readiness;
        }

        if (searchString === 'Special Task Force' && Q.stf_strength !== undefined) {
            var strength = Q.stf_strength ? Q.stf_strength : '0';
            var morale = getLoyaltyText(Q.stf_morale);
            var status = getStatusText(Q.stf_gstatus);
            var readiness = getMilitancyText(Q.stf_readiness)
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale + '<br>Readiness: ' + readiness;
        }
      
        if (searchString === 'Sri Lanka Police' && Q.slp_strength !== undefined) {
            var strength = Q.slp_strength ? Q.slp_strength : '0';
            var morale = getLoyaltyText(Q.slp_morale);
            var readiness = getMilitancyText(Q.slp_readiness)
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale + '<br>Readiness: ' + readiness;
        }
        
        if (searchString === 'Civil Security' && Q.homeg_civilsec_strength !== undefined) {
            var strength = Q.homeg_civilsec_strength ? Q.homeg_civilsec_strength : '0';
            var morale = getLoyaltyText(Q.homeg_civilsec_morale);
            var readiness = getMilitancyText(Q.homeg_civilsec_readiness)
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale + '<br>Readiness: ' + readiness;
        }
        
        if (searchString === 'Home Guard' && Q.homeg_civilsec_strength !== undefined) {
            var strength = Q.homeg_civilsec_strength ? Q.homeg_civilsec_strength : '0';
            var morale = getLoyaltyText(Q.homeg_civilsec_morale);
            var readiness = getMilitancyText(Q.homeg_civilsec_readiness)
            return baseTooltip.explanationText + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale + '<br>Readiness: ' + readiness;
        }

        if (searchString === 'IPKF' && Q.ipkf_size !== undefined) {
            var strength = Q.ipkf_size ? Q.ipkf_morale : '0';
            var morale = getLoyaltyText(Q.ipkf_morale);
            var status = getStatusText(Q.ipkf_gstatus);
            return baseTooltip.explanationText + '<br>' + status + '<br>Strength: ' + strength + 'k<br>Morale: ' + morale;
        }
        
        return baseTooltip.explanationText;
        
    }
    
    window.getDynamicTooltipContent = getDynamicTooltipContent;
  
    function applyWholesome(str) {
        const allWords = new Set([
            ...tooltipList.map(t => t.searchString),
            ...colourList.map(c => c.word)
        ]);
    
// Escape special regex characters in the words
const escapedWords = [...allWords].map(word =>
    word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
);

const regex = new RegExp(`(^|[^\\w])(${escapedWords.join('|')})(?=$|[^\\w])`, 'g');

return str.replace(/(<(?:span|strong)[^>]*>.*?<\/(?:span|strong)>|<[^>]+>|[^<]+)/g, (segment) => {
    if (segment.startsWith('<')) return segment;

    return segment.replace(regex, (fullMatch, prefix, matchWord) => {
        const tooltip = tooltipList.find(t => t.searchString === matchWord);
        const colour = colourList.find(c => c.word === matchWord);

        let style = colour ? colour.style : '';
        let innerText = matchWord;

        if (colour && colour.img) {
            innerText = `<img src="${colour.img}" class="p_icon" alt="">${innerText}`;
        }

        if (tooltip) {
            var tooltipContent = getDynamicTooltipContent(matchWord, tooltip);
            return prefix + `<span class='mytooltip' style='${style}'>${innerText}<span class='mytooltiptext'>${tooltipContent}</span></span>`;
        } else if (colour) {
            return prefix + `<span style='${style}'>${innerText}</span>`;
        }

        return prefix + matchWord;
       });
   });
}
  
  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
  };

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  // tabbed browsing
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };



  window.onDisplayContent = function() {
      window.updateSidebar();
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
  window.statusTab = "status";
  window.dendryModifyUI = main;
  console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

  window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: false});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

document.addEventListener('mousemove', e => {
    document.querySelectorAll('.mytooltiptext').forEach(el => {
        el.style.setProperty('--mouse-x', e.clientX + 'px');
        el.style.setProperty('--mouse-y', e.clientY + 'px');
      });
  });
}());
