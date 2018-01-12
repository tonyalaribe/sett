package gob

import (
	"testing"

	"github.com/tonyalaribe/sett/codec/internal"
)

func TestGob(t *testing.T) {
	internal.RoundtripTester(t, Codec)
}
