import 'react-native-get-random-values';

import { CreateBookingDTO } from '@seekNseat/contracts/booking';
import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Modal, Portal, Provider, Subheading } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

import { AuthContext } from '../../auth/navigation';
import { requestBooking } from '../../booking/requests';
import { BusinessCard, mode, ResquestBookingButton } from '../components';
import { getBusiness } from '../requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const BusinessScreen = ({ route }) => {
  const { bookingData, bearerToken, userId } = useContext(AuthContext);
  const { businessId } = route.params;
  const [bookingRequest, setBookingRequest] = useState<CreateBookingDTO>();
  const [business, setBusiness] = useState<BusinessDTO>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getBusiness(businessId, bearerToken).then((res) => {
      setBusiness(res?.data);
    });
  }, [businessId]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onRequestBooking = () => {
    showModal();
    setBookingRequest((bookingRequest) => ({
      ...bookingRequest,
      _id: uuidv4(),
      userId: userId,
      businessId: businessId,
      numberOfFoodies: bookingData.foodies,
      time: bookingData.time,
    }));
  };

  const onConfirmRequestBooking = () => {
    requestBooking(bookingRequest, bearerToken).then((res) => hideModal());
  };

  return business ? (
    <Provider>
      <View style={styles.container}>
        <BusinessCard business={business} />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Icon
              style={{ margin: 10 }}
              name="restaurant"
              size={40}
              type="ionicon"
              color="#0D8686"
            />
            <Text
              style={{ textAlign: 'center', fontSize: 18, color: '#525252' }}
            >
              Genial! si confirmas se enviará automaticamente al restaurante
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: '#525252',
                marginTop: 10,
              }}
            >
              Resumen de tu reserva:
            </Text>
            <Text
              style={{ textAlign: 'center', fontSize: 16, color: '#525252' }}
            >
              {' '}
              Mesa para: {bookingData.foodies}{' '}
            </Text>
            <Text
              style={{ textAlign: 'center', fontSize: 16, color: '#525252' }}
            >
              {' '}
              Hora: {bookingData.time.toJSON().slice(11, -8)}{' '}
            </Text>
            <ResquestBookingButton
              text="Confirmar reserva"
              mode={mode.Contained}
              onPress={onConfirmRequestBooking}
            />
          </Modal>
        </Portal>

        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Subheading
              style={{
                fontSize: 18,
                color: '#0D8686',
                fontWeight: 'normal',
                textAlign: 'center',
              }}
            >
              {' '}
              Resumen de tu reserva{' '}
            </Subheading>
            <Icon
              style={{ marginLeft: 10 }}
              name="restaurant"
              type="ionicon"
              color="#0D8686"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <View style={{ margin: 10, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: '#525252' }}>
                {' '}
                Mesa para: {bookingData.foodies}{' '}
              </Text>
              <Text style={{ fontSize: 16, color: '#525252' }}>
                {' '}
                Hora: {bookingData.time.toJSON().slice(11, -8)}{' '}
              </Text>
            </View>

            <ResquestBookingButton
              text="Solicitar reserva"
              mode={mode.Outlined}
              onPress={onRequestBooking}
            />
          </View>
        </View>
      </View>
    </Provider>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} size="large" color="#0D8686" />
    </View>
  );
};
