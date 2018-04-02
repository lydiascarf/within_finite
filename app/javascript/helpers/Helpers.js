import Tone from 'tone';

const tones = ['=R','-2','+2','-3','+3','-4','=T','+5','-6','+6','-7','+7'];
function note(fundamental) {
  return (
    { volume: 0.0,
      id: tones[fundamental-1],
      fundamental: fundamental,
      harmonics: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
      ]
    }
  )
}

function notes(num) {
  let notes = [];
  for (let i=1; i<=num; i++) {
    notes.push(note(i));
  }
  return notes;
}

function seedChord(id) {
  let partials;
  if (id%2 == 0) {
    partials = [
      1.0, 0.5, 0.2, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0
    ]
  }
  else {
    partials = [
      0.5, 0.4, 0.2, 0.4,
      0.0, 0.0, 0.3 , 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.2, 0.3, 0.5
    ]
  }
  return(
    {
      id: id,
      notes: notes(12),
      root: Tone.Frequency('A3'),
      synth: new Tone.PolySynth(8, Tone.Synth).toMaster(),
      notes2: [Tone.Frequency('A3'),Tone.Frequency('C4'),Tone.Frequency('E4'),Tone.Frequency('G4')],
      partials: partials
    }
  )
}

export function buildRhythm(lastRhythmId, length) {
  let chordList = [];
  for (let i=0; i<length; i++) {
    chordList.push(seedChord(i+1))
  }
  return (
    {
      id: lastRhythmId + 1,
      chords: chordList
    }
  )
}

function seedRhythm() {
  return (
    {
      id: 1,
      chords: [seedChord(1),seedChord(2)]
    }
  )
}

export function buildSection(lastSectionId) {
  return (
    {
      id: lastSectionId + 1,
      rhythms: [seedRhythm()]
    }
  )
}

function seedSection() {
  return (
    {
      id: 1,
      rhythms: [seedRhythm()]
    }
  )
}

export function seedApp() {
  return (
    {
      sections: [seedSection()]
    }
  )
}
