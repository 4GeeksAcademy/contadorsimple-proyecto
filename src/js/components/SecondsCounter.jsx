import React, { useEffect, useRef, useState } from "react";


const SecondsCounter = ({ segundoInicial = 0, porTerminar = 3, maxSegundos = 20 }) => {
    const [segundos, setSegundos] = useState(segundoInicial);
    const [finalizar, setFinished] = useState(false);
    const intereferencial = useRef(null);

    const getEstadoLabel = () => {
        const resultado1 = maxSegundos / porTerminar;
        const resultado2 = maxSegundos - 5;
        if (finalizar) {
            return <span className="badge text-bg-success text-dark p-3 fs-6">Finalizo Correctamente</span>;
        }
        if (segundos >= resultado2) {
            return <span className="badge text-bg-warning p-3 fs-6">Esta por Finalizar el conteo</span>;
        }
        if (segundos >= resultado1) {
            return <span className="badge text-bg-secondary p-3 fs-6">Conteo Avanza Sin Problemas</span>;
        }
        if (segundos === segundoInicial || segundos < resultado1) {
            return <span className="badge text-bg-danger p-3 fs-6">Inicio del conteo</span>;
        }
        return "";
    };

    const MostrarSegundos = () => {
        return (
          <div className="d-flex gap-2">
            {String(segundos)
              .padStart(6, '0')
              .split('')
              .map((mapeo, index) => (
                <div key={index} className="bg-secondary text-dark fw-bold fs-3 p-2 rounded">
                  {mapeo}
                </div>
              ))}
          </div>
        );
      }   
    
        
    useEffect(() => {
        intereferencial.current = setInterval(() => {
            setSegundos((prev) => {
                const siguiente = prev + 1;
                if (siguiente >= maxSegundos) {
                    clearInterval(intereferencial.current);
                    setFinished(true);
                    return maxSegundos;
                }

                return siguiente;
            });
        }, 1000);

        return () => clearInterval(intereferencial.current);
    }, [maxSegundos]);

    return (
        <div className="container text-center mt-5">
            <div className="d-flex justify-content-center align-items-center gap-1 bg-light border border-1 border-dark rounded-2 p-2">
                <div className="bg-info p-3 rounded-2">
                    <i className="fa-regular fa-clock fa-2xl"></i>
                </div>
                {MostrarSegundos()}
            <span className="bg-secondary px-3 py-3 rounded-3 ms-2">Seg.</span>
            </div>

            <div className="mt-3">
                {getEstadoLabel()}
            </div>
        </div>
    );
};

export default SecondsCounter;