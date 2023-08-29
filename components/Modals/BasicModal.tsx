import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import { BasicModalProps } from 'constants/SharedTypes';

const BasicModal = ({
  title,
  message,
  buttons,
  isModalVisible,
  setIsModalVisible
}: BasicModalProps) => {
  const Title = title ? title : 'Menu';
  const Message = message ? message : 'Buttons and controls can go here';

  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
        supportedOrientations={['landscape']}
        transparent
        style={styles.modalContainer}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{Title}</Text>
            <Text style={styles.modalText}>{Message}</Text>
            {buttons
              ? buttons.map((button, index) => (
                  <Pressable
                    key={index}
                    style={styles.modalButton}
                    onPress={() => button.action()}
                  >
                    <Text>{button.text}</Text>
                  </Pressable>
                ))
              : null}
            <Pressable
              style={styles.modalButton}
              onPress={() => setIsModalVisible(!isModalVisible)}
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BasicModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    marginLeft: 50
  },
  modal: {
    minHeight: 250,
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderColor: '#d18408',
    backgroundColor: '#d6a811',
    borderWidth: 3,
    borderRadius: 10,
    padding: 20
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#84daf2',
    paddingBottom: 10
  },
  modalText: {},
  modalButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d18408',
    backgroundColor: '#84daf2',
    minWidth: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
