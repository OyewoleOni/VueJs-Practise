<template>
    <div>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-body">
                <slot name="body">
                    <p>Are you sure you want to delete?</p>
                    <div class="buttons">
                        <button class="modal-danger-button" @click="$emit('delete')">
                        Proceed
                    </button>
                    <button class="modal-default-button" @click="$emit('close')">
                        Cancel
                    </button>
                 </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<style lang="scss">
.modal-mask {
  font-size: 1rem;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  & .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    & .modal-container {
        width: fit-content;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        & .modal-body {
            text-align: center;
            & .buttons {
                margin-top: 2rem;
                & .modal-default-button {
                    cursor: pointer;
                    border: .1rem solid grey;
                    border-radius: .5rem;
                    background-color: white;
                    margin: 0 .5rem;
                    padding: .2rem .5rem;
                }

                & .modal-danger-button {
                    border: .1rem solid #891e05;
                    border-radius: .5rem;
                    background-color: #ffffff;
                    color: #b50505;
                    margin: 0 .5rem;
                    padding: .2rem .5rem;
                    cursor: pointer;
                }
            }
        }
    }
  }
}

</style>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
