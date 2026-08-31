import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function TelaClima() {
    const [clima, setClima] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function fetchClima() {
            try {
                const respostaApi = await fetch('https://api.hgbrasil.com/weather?key=ba94c742&city_name=Recife,PE');
                const dadosClima = await respostaApi.json();
                setClima(dadosClima.results);
            } catch (e) {
                setErro('Falha no carregamento. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        }
        fetchClima();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.loadingText}>Carregando o clima, segura aí...</Text>
            </View>
        );
    }

    if (erro) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.loadingText}>{erro}</Text>
            </View>
        );
    }

    const hoje = clima?.forecast?.[0] ?? {};
    const proximosDias = clima?.forecast?.slice(1, 7) ?? [];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.cidade}>📍 {clima?.city ?? '--'}  ▾</Text>
                <Text style={styles.sino}>🔔</Text>
            </View>

            {/* Ícone + Temperatura */}
            <View style={styles.blocoTemperatura}>
                <Text style={styles.iconeClima}>🌧️</Text>
                <Text style={styles.temperatura}>{clima?.temp ?? '--'}°</Text>
                <Text style={styles.precipitacaoLabel}>Precipitations</Text>
                <Text style={styles.maxMin}>
                    Max.: {hoje?.max ?? '--'}°  Min.: {hoje?.min ?? '--'}°
                </Text>
            </View>

            {/* Faixa de estatísticas */}
            <View style={styles.faixaStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statIcone}>☂️</Text>
                    <Text style={styles.statTexto}>{hoje?.rain_probability ?? '--'}%</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statIcone}>💧</Text>
                    <Text style={styles.statTexto}>{clima?.humidity ?? '--'}%</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statIcone}>💨</Text>
                    <Text style={styles.statTexto}>{clima?.wind_speedy ?? '--'}</Text>
                </View>
            </View>

            {/* Card - Today */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitulo}>Today</Text>
                    <Text style={styles.cardData}>{hoje?.date ?? ''}</Text>
                </View>
                <View style={styles.horasContainer}>
                    <View style={[styles.horaItem, styles.horaItemDestaque]}>
                        <Text style={styles.horaTemp}>{hoje?.max ?? '--'}°C</Text>
                        <Text style={styles.horaTemp}>{hoje?.min ?? '--'}°C</Text>
                        <Text style={styles.horaIcone}>🌧️</Text>
                        <Text style={styles.horaHorario}>{hoje?.weekday ?? ''}</Text>
                    </View>
                </View>
            </View>

            {/* Card - Next Forecast */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitulo}>Next Forecast</Text>
                    <Text style={styles.cardIcone}>📅</Text>
                </View>
                {proximosDias.map((dia, index) => (
                    <View key={dia?.date ?? String(index)} style={styles.diaItem}>
                        <Text style={styles.diaNome}>{dia?.weekday ?? '--'}</Text>
                        <Text style={styles.diaIcone}>🌦️</Text>
                        <Text style={styles.diaTemp}>
                            {dia?.max ?? '--'}° / {dia?.min ?? '--'}°
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a2a80',
        padding: 20,
        paddingTop: 50,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 12,
        fontSize: 14,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cidade: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sino: {
        fontSize: 18,
    },
    blocoTemperatura: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    iconeClima: {
        fontSize: 64,
    },
    temperatura: {
        color: '#fff',
        fontSize: 56,
        fontWeight: '700',
        marginTop: 4,
    },
    precipitacaoLabel: {
        color: '#cfd6ff',
        fontSize: 14,
        marginTop: 4,
    },
    maxMin: {
        color: '#cfd6ff',
        fontSize: 13,
        marginTop: 2,
    },
    faixaStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderRadius: 30,
        paddingVertical: 12,
        marginBottom: 20,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIcone: {
        fontSize: 14,
        marginRight: 6,
    },
    statTexto: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitulo: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    cardData: {
        color: '#cfd6ff',
        fontSize: 13,
    },
    cardIcone: {
        fontSize: 16,
    },
    horasContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    horaItem: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 14,
        marginRight: 8,
        marginBottom: 8,
    },
    horaItemDestaque: {
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    horaTemp: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
    },
    horaIcone: {
        fontSize: 18,
    },
    horaHorario: {
        color: '#cfd6ff',
        fontSize: 11,
    },
    diaItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    diaNome: {
        color: '#fff',
        fontSize: 14,
        flex: 1,
    },
    diaIcone: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
    },
    diaTemp: {
        color: '#cfd6ff',
        fontSize: 13,
        flex: 1,
        textAlign: 'right',
    },
});