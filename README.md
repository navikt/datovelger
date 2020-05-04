# nav-datovelger

Enkel datovelger basert på react-day-picker
https://www.npmjs.com/package/react-day-picker

# Bruk

```javascript
import { Datovelger } from 'nav-datovelger';

const BasicDatovelger = () => {
    const [dato, setDato] = useState('');
    return (
        <Datovelger onChange={setDato} valgtDato={dato} />
    );
};

const AvansertDatovelger = () => {
    const [dato, setDato] = useState('');

    return (
        <Datovelger
            valgtDato={dato}
            onChange={(d) => setDato(d)}
            id="minID"
            kalender={{ visUkenumre: true }}
            visÅrVelger={true}
            locale={'nb'}
            avgrensninger={{
                helgedagerIkkeTillatt: false,
                ugyldigeTidsperioder: [
                    {
                        fom: '2020-04-10',
                        tom: '2020-04-11',
                    }
                ],
                minDato: '2020-04-03',
                maksDato: '2020-05-15',
            }}
        />
);
}
```

# Kjøre eksempel-app

Starter app med enkelt eksempel

```
npm run dev
```
