import { useEffect, useState } from "react";

export function useGeolocation() {
    const [locationData, setLocationData] = useState({
        coordinates: null,  // Fixed spelling
        error: null,
        isLoading: true
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    },
                    isLoading: false,
                    error: null
                });
            },
            (error) => {  
                let errorMessage;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied. Please enable location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                        break;
                }

                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false
                });
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Fix: Moved options to the correct place
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    console.log(locationData);
    return {
        ...locationData,
        getLocation,
    };
}
